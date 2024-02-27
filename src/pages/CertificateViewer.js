import React, { useCallback, useState, useContext, useEffect } from 'react'
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
  'Your certification status is dynamic and may change  over time. Always refer to this page for the most up-to-date status.'

export default function CertificateViewer() {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  const origin = persona.origin

  const { id } = useParams()

  const { error, callApiFn } = useAxios(false)
  const [data, setData] = useState(null)

  const callApi = useCallback(async () => {
    const path = `/v1/certificate/${id}`
    let res = null
    try {
      res = await callApiFn({ url: `${origin}${path}` })
    } catch (e) {
      alert(JSON.stringify(e))
    }
    if (JSON.stringify(res) != JSON.stringify(data)) setData(res)
  }, [origin, id, data, callApiFn])

  // Query API every two seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await callApi()
    }, 2 * 1000)
    const unmountCleanup = () => clearInterval(intervalId)
    return unmountCleanup
  }, [callApi])

  if (error) return <>Err:{JSON.stringify(error?.message)}</>

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
            {data?.created_at && formatTimelineDate(data.created_at)}
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
                <>
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
                      />
                    </Grid.Panel>
                  </Grid>
                </>
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
  max-width: 400px;
  max-height: 100%;
  padding: 20px 0px;
  overflow: hidden;
  background: #0c3b38;
  width: 400px;
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

const ContainerDiv = styled.div`
  display: grid;
  height: 100%;
  grid-area: 1 / 1 / -1 / -1;
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
  padding: 34px;
  height: 100%;
  align-content: start;
`

const Paper = styled.div`
  position: relative;
  width: 100%;
  padding: 15px;
  color: #000000;
  background: #efefef;
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
    border-color: transparent #228077 #efefef transparent;
    background: transparent;
    display: block;
    width: 0;
  }
`
