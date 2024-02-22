/* eslint-disable no-console */
import React, { useCallback, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'

import { Context } from '../utils/Context'
import { personas } from '../App'

import { useParams } from 'react-router-dom'

import useAxios from '../hooks/use-axios'

import CertificateViewHeader from './components/CertificateViewHeader'

import LockerSvg from '../assets/images/locker-icon.svg'
import SealSvg from '../assets/images/approval-seal-small.svg'

const DivLock = styled.div`
  text-align: left;
`

const SpanLock = styled.span`
  width: 100%;
  position: relative;
  color: #4e9a91;
  font-family: Roboto;
  font-size: 18.4px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  margin-left: 45px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -45px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    border-radius: 50%;
    background: #1f7d74 url(${LockerSvg}) no-repeat;
  }
`

const DivRounded = styled.div`
  border-radius: 10px;
  background: #27847a;
  color: #ffffff;
  padding: 20px;
  margin: 8px 0;
  text-align: left;

  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

const Div = styled.div`
  line-height: 30px;
  margin: 20px 0 0 0;
`

const Hr = styled.hr`
  border-style: solid;
  margin: 40px 0 20px 0;
`

const DivImageLeft = styled.div`
  width: 100%;
  position: relative;
  color: #ffffff;
  font-family: Roboto;
  font-size: 18.4px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  padding-left: 44px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0px;
    margin-top: -25px;
    width: 34px;
    height: 50px;
    background: transparent url(${SealSvg}) no-repeat;
  }
`

const Small = styled.small`
  color: #94c0bc;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  display: block;
`

const CertificateViewOwnership = ({ id, hOwner, eOwner }) => {
  return (
    <>
      <DivLock>
        <SpanLock>{id?.indexOf('-') > 0 ? id : `UK-HYPROOF-${id}`}</SpanLock>
      </DivLock>
      <DivRounded>
        <Div>Hydrogen Owner: {hOwner}</Div>
        <Div>Energy Owner: {eOwner}</Div>
        <Hr />
        <DivImageLeft>
          <Div>LCHS</Div>
          <Small>Adherence to government standards</Small>
        </DivImageLeft>
      </DivRounded>
    </>
  )
}

const PaddedWrapperDiv = styled.div`
  padding: 4px;
  height: calc(100% - 200px);

  text-align: left;

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 1px solid #111111;
  background: #efefef;
`

const ContainerFlexWrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FlexDiv = styled.div`
  margin: 0px 8px 20px 8px;
  height: 110px;
  line-height: 110px;
  min-width: 169px;
  flex-grow: 1;

  background: #cfcfcf;
`

const FlexRoundedDiv = styled.div`
  margin: 0px 8px 20px 8px;
  height: 110px;
  line-height: 110px;
  min-width: 169px;
  flex-grow: 1;

  border-radius: 10px;
  background: #33e58c;
`

const FlexLargeDiv = styled(FlexDiv)`
  min-width: 354px;

  background: #d8d8d8;
`

const ContainerFlexNoWrapDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const ContainerFullWidthWrapDiv = styled.div`
  width: 100%;
`

const GrowingDiv = styled.div`
  flex-grow: 1;
`

const HeadingDiv = styled.div`
  color: #1a1a1a;
  height: 28px;
  font: 500 15px/28px Roboto;
`

const FixedWidthSmallDiv = styled.div`
  width: 98px;
  height: 82px;
  margin-top: 28px;
  text-align: center;
  color: #27847a;
  font: 500 14px/82px Roboto;
  border-left: 1px solid #27847a;
  border-right: 1px solid #27847a;

  background: #d2d2d2;
`

const CertificateViewDetails = () => {
  return (
    <>
      <PaddedWrapperDiv>
        <ContainerFlexWrapDiv>
          <FlexLargeDiv>
            <ContainerFlexNoWrapDiv>
              <GrowingDiv>
                <HeadingDiv>StartHeading</HeadingDiv>
              </GrowingDiv>
              <FixedWidthSmallDiv>07H 30M</FixedWidthSmallDiv>
              <GrowingDiv>
                <HeadingDiv>EndHeading</HeadingDiv>
              </GrowingDiv>
              {/* FlexLargeDiv */}
            </ContainerFlexNoWrapDiv>
          </FlexLargeDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>EnergyHeading</HeadingDiv>
              {/* FlexDiv */}
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>SizeHeading</HeadingDiv>
              {/* FlexDiv */}
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
          <FlexRoundedDiv>
            <ContainerFullWidthWrapDiv>FlexRoundedD</ContainerFullWidthWrapDiv>
          </FlexRoundedDiv>
        </ContainerFlexWrapDiv>
      </PaddedWrapperDiv>
    </>
  )
}

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
    console.log(Math.random())
  }, [origin, id, data, callApiFn])

  // Query API every second
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await callApi()
    }, 1 * 1000)
    const unmountCleanup = () => clearInterval(intervalId)
    return unmountCleanup
  }, [callApi])

  // useEffect(() => {
  //   callApiFn({ url }).then((res) => { alert(JSON.stringify(res)) })
  // }, [id, origin, callApiFn])

  if (error) return <>Err:{JSON.stringify(error?.message)}</>

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <LeftWrapper area="timeline"></LeftWrapper>
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
                      <CertificateViewDetails />
                      <small>{data && JSON.stringify(data, null, 2)}</small>
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
  background: #27847a;
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
    border-color: transparent #27847a #27847a transparent;
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
    border-color: transparent #27847a #efefef transparent;
    background: transparent;
    display: block;
    width: 0;
  }
`
