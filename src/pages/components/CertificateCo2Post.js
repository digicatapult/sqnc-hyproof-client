import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Grid, Timeline } from '@digicatapult/ui-component-library'

import Nav from '../components/Nav'
import Header from '../components/Header'

import { useParams } from 'react-router-dom'

import { Context } from '../../utils/Context'
import { formatDate } from '../../utils/helpers'
import { personas } from '../../App'
import { TimelineDisclaimer } from './shared'

import useAxios from '../../hooks/use-axios'

const embodiedCo2 = 135
const disclaimer =
  'Your certification status is dynamic and may change  over time. Always refer to this page for the most up-to-date status.'

export default function CertificateCo2Post() {
  const { id } = useParams()
  const {
    current,
    currentCommitment: hash,
    currentCommitmentSalt: salt,
    currentEnergyConsumedWh: energy,
    currentProductionStartTime: start,
    currentProductionEndTime: end,
  } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)

  const origin = persona.origin

  const [errorHash, setErrorHash] = useState('')

  const [dataCertFound, setDataCertFound] = useState(null)
  const [dataCertLocal, setDataCertLocal] = useState(null)
  const [dataCertChain, setDataCertChain] = useState(null)
  const [dataCertFinal, setDataCertFinal] = useState(null)

  const { error: errorFound, callApiFn: callApiFnFound } = useAxios(false)
  const { error: errorLocal, callApiFn: callApiFnLocal } = useAxios(false)
  const { error: errorChain, callApiFn: callApiFnChain } = useAxios(false)
  const { error: errorFinal, callApiFn: callApiFnFinal } = useAxios(false)

  const [loading, setLoading] = useState(false)

  const handleSubmitStep = useCallback(
    async (id, salt, energy, start, end) => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const path = `/v1/certificate/${id}`
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
        const path = `/v1/certificate/${id}/issuance`
        const url = `${origin}${path}`
        const body = { embodied_co2: embodiedCo2 }
        const resChain = await callApiFnChain({ url, body })
        setDataCertChain(resChain)
        if (resChain?.state === 'submitted') {
          const path = `/v1/certificate/${id}`
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
    [origin, callApiFnLocal, callApiFnChain, callApiFnFinal]
  )

  useEffect(() => {
    const callApiFnAsync = async (id, hash, salt, energy, start, end) => {
      var path = `/v1/certificate/${id}`
      var url = `${origin}${path}`
      const resCertFound = await callApiFnFound({ url })
      const hashCertFound = resCertFound?.commitment
      if (hashCertFound != hash) {
        setErrorHash('ErrorFoundCertHasWrongHash')
        return
      }
      setDataCertFound(resCertFound)
      handleSubmitStep(id, salt, energy, start, end)
    }
    callApiFnAsync(id, hash, salt, energy, start, end)
  }, [
    id,
    hash,
    salt,
    energy,
    start,
    end,
    origin,
    callApiFnFound,
    handleSubmitStep,
  ])

  if (errorHash) return <p>{errorHash}</p>
  // if (loading) return <p>Loading...</p>
  if (errorFound || errorLocal || errorChain || errorFinal)
    return (
      <p>
        Err:
        {JSON.stringify({
          errorFound,
          errorLocal,
          errorChain,
          errorFinal,
        })}
      </p>
    )
  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <LeftWrapper area="timeline">
        <Timeline
          name={persona.company}
          disclaimer={disclaimer}
          variant={'hyproof'}
        >
          <Timeline.Item variant="hyproof" title={'Initiation'} checked={true}>
            {dataCertFound && formatDate(dataCertFound.created_at)}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Carbon Embodiment'}
            checked={dataCertChain?.embodied_co2}
          >
            {dataCertChain?.embodied_co2 &&
              formatDate(dataCertChain.updated_at)}
          </Timeline.Item>
          <Timeline.Item variant="hyproof" title={'Issuance'} checked={false}>
            {dataCertChain?.state == 'issued' &&
              formatDate(dataCertFinal.updated_at)}
          </Timeline.Item>
        </Timeline>
        <TimelineDisclaimer>{disclaimer}</TimelineDisclaimer>
      </LeftWrapper>
      <MainWrapper>
        <Grid.Panel area="main">
          <Container>
            <br />
            <br />
            <br />
            ---
            {loading && (
              <>
                <br />
                Loading
                <AnimatedSpan>...</AnimatedSpan>
                <br />
                <br />
                <br />
                <br />
              </>
            )}
            ---
            <small>
              <code>
                <br />
                <br />
                {JSON.stringify(
                  dataCertFinal ||
                    dataCertChain ||
                    dataCertLocal ||
                    dataCertFound ||
                    {},
                  null,
                  2
                )}
              </code>
            </small>
          </Container>
        </Grid.Panel>
        <Sidebar area="sidebar"></Sidebar>
      </MainWrapper>
    </>
  )
}

const LeftWrapper = styled(Grid.Panel)`
  max-width: 400px;
  max-height: 100%;
  padding: 20px 0px;
  overflow: hidden;
  background: #0c3b38;
`

const MainWrapper = styled.div`
  display: grid;
  grid: subgrid / subgrid;
  grid-area: 2 / 1 / -1 / -1;
  overflow: hidden;
  text-align: center;
`

const Sidebar = styled(Grid.Panel)`
  align-items: center;
  justify-items: center;
  min-width: 340px;
  color: white;
  background: #0c3b38;
`

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-area: 1 / 1 / -1 / -1;
  background: white;
`

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
