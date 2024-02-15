import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { Context } from '../../utils/Context'
import { personas } from '../../App'

import useAxios from '../../hooks/use-axios'

const embodiedCo2 = 135

export default function CertificateCo2Post({ hash, salt, energy, start, end }) {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)

  const origin = persona.origin
  const path = '/v1/certificate'
  const u = `${origin}${path}`
  const { data: dataAll, error, loading: loadingAll } = useAxios(true, u)

  const [loading, setLoading] = useState(false)
  const [dataCertEmpty, setDataCertEmpty] = useState(null)
  const [dataCertLocal, setDataCertLocal] = useState(null)
  const [dataCertChain, setDataCertChain] = useState(null)
  const [dataCertFinal, setDataCertFinal] = useState(null)

  const [errorCompute, setComputeError] = useState('')

  const { error: errorLocal, callApiFn: callApiFnLocal } = useAxios(false)
  const { error: errorChain, callApiFn: callApiFnChain } = useAxios(false)
  const { error: errorFinal, callApiFn: callApiFnFinal } = useAxios(false)

  const handleSubmitStep = useCallback(
    async (certId) => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const path = `/v1/certificate/${certId}`
      const url = `${origin}${path}`
      const body = {
        commitment_salt: salt,
        energy_consumed_wh: energy,
        production_start_time: start,
        production_end_time: end,
      }
      const method = 'put'
      const resLocal = await callApiFnLocal({ url, body, method })
      setDataCertLocal(resLocal)
      if (resLocal?.state === 'initiated') {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const path = `/v1/certificate/${certId}/issuance`
        const url = `${origin}${path}`
        const body = { embodied_co2: embodiedCo2 }
        const resChain = await callApiFnChain({ url, body })
        setDataCertChain(resChain)
        if (resChain?.state === 'submitted') {
          const path = `/v1/certificate/${resChain?.local_id}`
          let isFinalised = false
          while (!isFinalised) {
            const res = await callApiFnFinal({ url: `${origin}${path}` })
            setDataCertFinal(res)
            if (res?.state === 'issued') isFinalised = true
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
          setLoading(false)
          alert('DONE')
        }
      }
    },
    [
      origin,
      salt,
      energy,
      start,
      end,
      callApiFnLocal,
      callApiFnChain,
      callApiFnFinal,
    ]
  )

  useEffect(() => {
    if (!dataAll) return
    const certFound = dataAll.find(({ commitment }) => commitment === hash)
    if (certFound == undefined) {
      setComputeError('ErrorNoCertWithGivenHash')
      return
    }
    if (!certFound.id) return
    if (certFound.id == dataCertEmpty?.id) return
    setDataCertEmpty(certFound)
    handleSubmitStep(certFound.id)
  }, [dataAll, hash, dataCertEmpty?.id, handleSubmitStep])

  // if (loadingAll || loading) return <p>Loading...</p>
  if (error || errorCompute || errorLocal || errorChain || errorFinal)
    return (
      <p>
        Err:
        {JSON.stringify({
          error,
          errorCompute,
          errorLocal,
          errorChain,
          errorFinal,
        })}
      </p>
    )
  return (
    <>
      <br />
      <br />
      <br />
      hash: {hash} <br /> salt: {salt} <br />
      energy: {energy} | start: {start} | end: {end} <br />
      ---
      {(loadingAll || loading) && (
        <>
          <br />
          Loading
          <AnimatedSpan>...</AnimatedSpan>
          <br />
        </>
      )}
      ---
      <small>
        <code>
          {JSON.stringify(
            dataCertFinal || dataCertChain || dataCertLocal || {},
            null,
            2
          )}
        </code>
      </small>
    </>
  )
}

const RevealAnimation = keyframes`
  from {
    width: 0px;
  }
  to {
    width: 22px;
  }
`

const AnimatedSpan = styled.span`
  overflow: hidden;
  display: inline-flex;
  white-space: nowrap;
  margin: 0 auto;
  animation: ${RevealAnimation} 1s steps(4, end) infinite;
`
