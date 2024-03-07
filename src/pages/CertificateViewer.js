import React, { useRef, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Timeline, Grid } from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'

import { Context } from '../utils/Context'
import { personas } from '../App'

import { useParams } from 'react-router-dom'

import useAxios from '../hooks/use-axios'

import CertificateViewHeader from './components/CertificateViewHeader'
import CertificateViewOwnership from './components/CertificateViewOwnership'
import CertificateViewDetails from './components/CertificateViewDetails'
import { formatTimelineDate } from '../utils/helpers'
import { TimelineDisclaimer } from './components/shared'

import BgMoleculesImageSVG from '../assets/images/molecules-bg-repeat.svg'

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

  // When mounted fetch every few secs and post co2 before that if Emma and co2 not set
  useEffect(() => {
    // Set empty interval identifier
    let intervalId = null

    // Fetch latest certificate
    const fetchLatestCert = async () => {
      let result = null
      try {
        result = await fetchCert({ url: `${origin}/v1/certificate/${id}` })
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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const hasCo2 = foundCert?.embodied_co2 !== null
      if (hasCo2) return
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
      body = {}
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

    // If Emma then post co2 if it hasn't got co2 (no embedded co2 from fetch) then start fetch loop
    curPersona === 'emma' &&
      fetchLatestCert().then((c) => {
        co2PostIfNeeded(c).then(() => {
          intervalId = setInterval(async () => {
            const latestCert = await fetchLatestCert()
            if (JSON.stringify(latestCert) != JSON.stringify(buffer.current)) {
              buffer.current = latestCert
              setData(latestCert)
            }
          }, 2 * 1000)
        })
      })

    // Start fetch loop ( fetch every few secs ) if not Emma
    curPersona !== 'emma' &&
      (intervalId = setInterval(async () => {
        const latestCert = await fetchLatestCert()
        if (JSON.stringify(latestCert) != JSON.stringify(buffer.current)) {
          buffer.current = latestCert
          setData(latestCert)
        }
      }, 2 * 1000))

    // Cleanup the interval on unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [curPersona, id, origin, context, fetchCert])

  if (errorLast) return <>ErrLast:{errorLast}</>
  if (errorHash) return <>ErrHash:{errorHash}</>

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
          <Timeline.Item
            variant="hyproof"
            title={'Initiation'}
            checked={data?.created_at}
          >
            {data?.created_at && formatTimelineDate(data?.created_at)}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Carbon Embodiment'}
            checked={data?.embodied_co2}
          >
            {data?.embodied_co2 && formatTimelineDate(data?.updated_at)}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Issuance'}
            checked={data?.state === 'issued'}
          >
            {data?.state === 'issued' && formatTimelineDate(data.updated_at)}
          </Timeline.Item>
        </Timeline>
        <TimelineDisclaimer>{disclaimer}</TimelineDisclaimer>
      </LeftWrapper>
      <MainWrapper>
        <Grid.Panel area="main">
          <ContainerDiv>
            <Paper>
              {data === null && <>...</>}
              {data && (
                <Grid
                  areas={[
                    ['div-header', 'div-header', 'div-header'],
                    ['div-ownership', 'div-details', 'div-details'],
                  ]}
                  rows={['auto', 'auto']}
                  columns={['1fr', '2fr']}
                  gap="15px"
                >
                  <Grid.Panel area="div-header">
                    <CertificateViewHeader id={id} />
                  </Grid.Panel>
                  <Grid.Panel area="div-ownership">
                    <CertificateViewOwnership
                      id={id}
                      hOwner={data?.hydrogen_owner}
                      eOwner={data?.energy_owner}
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
                    />
                  </Grid.Panel>
                </Grid>
              )}
            </Paper>
          </ContainerDiv>
        </Grid.Panel>
        <Sidebar area="sidebar"></Sidebar>
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
`

const ContainerDiv = styled.div`
  display: grid;
  grid-area: 1 / 1 / -1 / -1;
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
  padding: 34px;
  align-content: start;
`

const Paper = styled.div`
  position: relative;
  width: 100%;
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
