import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Context } from '../../utils/Context'
import { personas } from '../../App'

import useAxios from '../../hooks/use-axios'

export default function CertificateCo2Post({ hash, salt, energy, start, end }) {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)

  const origin = persona.origin
  const path = '/v1/certificate'
  const u = `${origin}${path}`
  const { data: dataAll, error, loading: loadingAll } = useAxios(true, u)

  const [loading, setLoading] = useState(false)
  const [dataCertEmpty, setDataCertEmpty] = useState(null)

  const [errorCompute, setComputeError] = useState('')

  const { error: errorLocal, callApiFn: callApiFnLocal } = useAxios(false)

  const handleSubmitStep = useCallback(
    async (certId) => {
      setLoading(true)
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
      setLoading(false)
      alert('PUTcallResult' + JSON.stringify(resLocal, null, 2))
    },
    [origin, salt, energy, start, end, callApiFnLocal]
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

  if (loadingAll || loading) return <p>Loading...</p>
  if (error || errorCompute || errorLocal)
    return <p>Err:{JSON.stringify({ error, errorCompute, errorLocal })}</p>
  return (
    <>
      <hr />
      hash: {hash} <br /> salt: {salt} <br />
      energy: {energy} | start: {start} | end: {end} <br />
      <hr />
      <small>
        <code>
          {JSON.stringify(dataCertEmpty ? dataCertEmpty : {}, null, 2)}
        </code>
      </small>
      <hr />
    </>
  )
}
