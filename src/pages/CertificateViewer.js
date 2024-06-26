import React, { useRef, useState, useContext, useEffect, useMemo } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'
import { Timeline, Grid } from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'

import { Context } from '../utils/Context'
import { personas } from '../App'

import { useParams } from 'react-router-dom'

import useAxios from '../hooks/use-axios'
import BgMoleculesImageSVG from '../assets/images/molecules-bg-repeat.svg'

import CertificateViewHeader from './components/CertificateViewHeader'
import CertificateViewOwnership from './components/CertificateViewOwnership'
import CertificateViewDetails from './components/CertificateViewDetails'
import { formatDate } from '../utils/helpers'
import { TimelineDisclaimer } from './components/shared'

import RevokeActionsButton from './components/RevokeActionsButton'

const disclaimer =
  'Your certification status is dynamic and may change over time. Always refer to this page for the most up-to-date status.'

export default function CertificateViewer() {
  // Constants
  const { id } = useParams()
  const context = useContext(Context)
  const { current: curPersona } = context
  const persona = personas.find(({ id }) => id === curPersona)
  const { origin } = persona
  const buffer = useRef(null)
  const [data, setData] = useState(null)
  const [posting, setPosting] = useState(false)
  const [errorHash, setErrorHash] = useState('')
  const [errorLast, setErrorLast] = useState('')
  const { callApiFn: fetchCert } = useAxios(false)
  const { refetchApiFn: refetch } = useAxios(
    false,
    '',
    '',
    '',
    '',
    `${origin}/v1/certificate/${id}`
  )
  const { callApiFn: callApi } = useAxios(false)
  const [revoking, setRevoking] = useState(false)
  const isRevoked = (d) => d?.state === 'revoked'
  const xor = (a, b) => (a || b) && !(a && b)

  // Functions
  const handleRevoke = useCallback(
    async (reasonsJSON) => {
      let id = data?.original_token_id
      let url, body

      setRevoking(true)

      // StepOne - The First POST
      url = `${origin}/v1/attachment`
      body = reasonsJSON

      const resLocal = await callApi({ url, body })
      if (!resLocal || !resLocal?.ipfs_hash || !resLocal?.id) return

      // StepTwo - The Second POST
      const fileId = resLocal?.id
      url = `${origin}/v1/certificate/${id}/revocation`
      body = { reason: fileId }
      const resChain = await callApi({ url, body })
      if (resChain?.state !== 'submitted') return

      // StepThree - The Periodical GET Check Loop
      url = `${origin}/v1/certificate/${id}`
      let isFinalised = false
      let res = null
      while (!isFinalised) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        res = await callApi({ url })
        if (res?.state === 'revoked') isFinalised = true
      }

      setRevoking(false)
    },
    [origin, callApi, data]
  )

  // When mounted fetch every few secs and post co2 before that if Emma and co2 not set
  useEffect(() => {
    // Fetch latest certificate
    const fetchLatestCert = async () => {
      let result = null
      try {
        result = (await refetch()).data
      } catch (e) {
        setErrorLast(e)
      }
      if (!Object.keys(result).length) setErrorLast('404')
      if (Object.keys(result).length) return result
    }

    // Post embodied co2 if needed
    const co2PostIfNeeded = async (foundCert) => {
      let url, body

      setPosting(true)

      const hasCo2 = foundCert?.embodied_co2 !== null
      if (hasCo2) {
        setPosting(false)
        return
      }
      const foundCertHash = foundCert?.commitment
      const {
        currentCommitment: hash,
        currentCommitmentSalt: salt,
        currentEnergyConsumedWh: energy,
        currentProductionStartTime: start,
        currentProductionEndTime: end,
      } = context
      if (foundCertHash != hash) {
        setErrorHash('ErrorFoundCertHasWrongHash')
        return
      }

      url = `${origin}/v1/certificate/${id}`
      body = {
        commitment_salt: salt,
        energy_consumed_wh: energy,
        production_start_time: start,
        production_end_time: end,
      }
      const resLocal = await fetchCert({ url, body, method: 'put' })
      if (resLocal?.state !== 'initiated') return

      url = `${origin}/v1/certificate/${id}/issuance`
      const carbonIntensityApiUrl = `https://api.carbonintensity.org.uk/intensity/${new Date(start).toISOString()}/${new Date(end).toISOString()}`
      const checkCarbonIntensityAPI = async (u) => {
        try {
          const result = await fetch(u)
          return result.ok
        } catch (e) {
          return false
        }
      }
      const getHardcodedFactor = () => {
        const factorLimits = [0.03, 0.11]
        const rnd = Math.random()
        return rnd * (factorLimits[1] - factorLimits[0]) + factorLimits[0]
      }
      const getHardcodedEco2 = (e) => Math.floor(getHardcodedFactor() * e)
      body = (await checkCarbonIntensityAPI(carbonIntensityApiUrl))
        ? {}
        : { embodied_co2: getHardcodedEco2(energy) }
      const resChain = await fetchCert({ url, body })
      if (resChain?.state !== 'submitted') return

      url = `${origin}/v1/certificate/${id}`
      let isFinalised = false
      let res = null
      while (!isFinalised) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        res = await fetchCert({ url })
        if (res?.state === 'issued') isFinalised = true
      }
      setPosting(false)
      buffer.current = res
      setData(res)
    }

    let fetchAndUpdate = async () => {
      const latestCert = await fetchLatestCert()
      if (JSON.stringify(latestCert) != JSON.stringify(buffer.current)) {
        buffer.current = latestCert
        setData(latestCert)
      }
      return latestCert
    }

    const fetchPromise = fetchAndUpdate()
    const intervalId = setInterval(fetchAndUpdate, 2 * 1000)

    // If Emma then post co2 if it hasn't got co2 (no embedded co2 from fetch)
    if (curPersona === 'emma') {
      setTimeout(() => {
        fetchPromise.then(co2PostIfNeeded)
      }, 3 * 1000)
    }

    // Cleanup the interval on unmount
    return () => {
      clearInterval(intervalId)
      setPosting(false)
      setData(null)
      buffer.current = null
    }
  }, [curPersona, id, origin, context, fetchCert, refetch])

  const certificateDates = useMemo(() => {
    return (
      data?.events.reduce(
        (acc, { event, occurred_at }) => {
          acc[event] = formatDate(occurred_at)
          return acc
        },
        { initiated: undefined, issued: undefined, revoked: undefined }
      ) || {}
    )
  }, [data])

  if (errorLast) return <>ErrLast:{errorLast}</>
  if (errorHash) return <>ErrHash:{errorHash}</>

  return (
    <>
      <Nav />
      <Header
        userFullName={persona.name}
        companyName={persona.company}
        color={persona.background}
      />
      <LeftWrapper area="timeline">
        <Timeline
          name={persona.company}
          disclaimer={disclaimer}
          variant={'hyproof'}
        >
          <Timeline.Item
            variant="hyproof"
            title={'Initiated'}
            checked={!!certificateDates.initiated}
          >
            {certificateDates.initiated}
          </Timeline.Item>

          {xor(!certificateDates?.revoked, revoking) && (
            <Timeline.Item
              variant="hyproof"
              title={'Carbon Embodiment'}
              checked={!!certificateDates.issued}
            >
              {certificateDates.issued}
            </Timeline.Item>
          )}

          <Timeline.Item
            variant="hyproof"
            title={'Issued'}
            checked={!!certificateDates.issued}
          >
            {certificateDates.issued}
          </Timeline.Item>

          {(!!certificateDates.revoked || revoking) && (
            <>
              <Timeline.Item
                variant="hyproof"
                title={revoking ? 'Revoking...' : 'Revoked'}
                checked={!revoking}
                revoked={revoking ? false : true}
              >
                {certificateDates.revoked}
              </Timeline.Item>
            </>
          )}
        </Timeline>

        <TimelineDisclaimer>{disclaimer}</TimelineDisclaimer>
      </LeftWrapper>
      <MainWrapper>
        <MainContainer area="main">
          <Paper>
            {data === null && <>...</>}
            {data && (
              <Grid
                areas={[['div-header'], ['div-ownership'], ['div-details']]}
                rows={['auto', 'auto', 'auto']}
                columns={['auto']}
                gap="15px"
                byWidth={[
                  {
                    minWidth: 1300,
                    areas: [
                      ['div-header', 'div-header', 'div-header'],
                      ['div-ownership', 'div-details', 'div-details'],
                    ],
                    rows: ['auto', 'auto'],
                    columns: ['1fr', '2fr'],
                    gap: '15px',
                  },
                ]}
              >
                <Grid.Panel area="div-header">
                  <CertificateViewHeader id={id} revoked={isRevoked(data)} />
                </Grid.Panel>
                <Grid.Panel area="div-ownership">
                  <CertificateViewOwnership
                    id={id}
                    hOwner={data?.hydrogen_owner}
                    eOwner={data?.energy_owner}
                    revoked={isRevoked(data)}
                  />
                </Grid.Panel>
                <Grid.Panel area="div-details">
                  <CertificateViewDetails
                    size={data?.hydrogen_quantity_wh}
                    start={data?.production_start_time}
                    end={data?.production_end_time}
                    energy={data?.energy_consumed_wh}
                    eco2={data?.embodied_co2}
                    posting={posting}
                    timestamp={
                      data?.events.find(({ event }) => event === 'issued')
                        ?.occurred_at
                    }
                    revoked={isRevoked(data)}
                  />
                </Grid.Panel>
              </Grid>
            )}
          </Paper>
        </MainContainer>
        <Sidebar area="sidebar">
          <RevokeActionsButton
            handleRevoke={handleRevoke}
            disabled={data?.state !== 'issued'}
            reason={data?.revocation_reason}
            loading={revoking}
          />
        </Sidebar>
      </MainWrapper>
    </>
  )
}

const LeftWrapper = styled(Grid.Panel)`
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
  color: white;
  background: #0c3b38;
  gap: 10px;
  padding: 34px 21px;
  & form {
    margin-bottom: -5px;
    width: 100%;
  }
`

const MainContainer = styled(Grid.Panel)`
  display: grid;
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
  padding: 34px;
  align-content: start;
`

const Paper = styled.div`
  position: relative;
  max-width: 1000px;
  margin-inline: auto;
  padding: 15px;
  color: #000000;
  background: #ffffff;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 41px 41px 0;
    border-style: solid;
    border-color: transparent #228077 #228077 transparent;
    background: transparent;
    display: block;
    width: 0;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 40px 40px 0;
    border-style: solid;
    border-color: transparent #228077 #ffffff transparent;
    background: transparent;
    display: block;
    width: 0;
  }
`
