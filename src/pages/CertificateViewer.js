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

import CertificateTimeInterval from './components/CertificateTimeInterval'

import LockerSvg from '../assets/images/locker-icon.svg'
import SealSvg from '../assets/images/approval-seal-small.svg'
import BgMoleculesImageSVG from '../assets/images/molecules-bg-repeat.svg'
import BgIconDateSVG from '../assets/images/icon-date.svg'
import BgIconTimeSVG from '../assets/images/icon-time.svg'

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
  min-height: 400px;

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
  // height: 110px;
  // line-height: 110px;
  min-width: 169px;
  flex-grow: 1;

  color: #27847a;
  border-left: 1px solid #27847a;

  // background: #11cfcf;
`

const FlexRoundedDiv = styled.div`
  margin: 0px 8px 20px 8px;
  // height: 110px;
  // line-height: 110px;
  min-width: 169px;
  flex-grow: 1;
  padding: 20px;

  border-radius: 10px;
  background: #33e58c;
`

const FlexLargeDiv = styled(FlexDiv)`
  min-width: 354px;

  background: #d8d8d8;
`

const ContainerFlexNoWrapDiv = styled.div`
  padding-left: 5px;
  display: flex;
  flex-wrap: nowrap;
`

const ContainerFullWidthWrapDiv = styled.div`
  padding-left: 5px;
  width: 100%;
`

const GrowingDiv = styled.div`
  flex-grow: 1;
`

const HeadingDiv = styled.div`
  // color: #1a1a1a;
  // height: 28px;
  // font: 700 15px/28px Roboto;
  color: #1a1a1a;
  height: 25px;
  font: 700 15px/25px Roboto;
`

// const FixedWidthSmallDiv = styled.div`
//   width: 98px;
//   height: 82px;
//   margin-top: 28px;
//   text-align: center;
//   color: #27847a;
//   font: 500 14px/82px Roboto;
//   border-left: 1px solid #27847a;
//   border-right: 1px solid #27847a;
//
//   background: #d2d2d2;
// `

const InputWrapShortDiv = styled.div`
  height: 42px;
  line-height: 42px;
  display: flex;
  flex-wrap: nowrap;
  padding: 15px 0 auto 0;
  // padding-left: 15px;
`

const InputWrapDiv = styled.div`
  height: 82px;
  line-height: 82px;
  display: flex;
  flex-wrap: nowrap;
  padding: 15px 0;
`

const InputHalfWrap = styled.div`
  width: 50%;
  height: 52px;
  line-height: 52px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`

const IconWrap = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  font: 500 14px/26px Roboto;
  color: #1a1a1a;
`

const IconDate = styled.span`
  width: 26px;
  height: 26px;
  background: transparent url(${BgIconDateSVG}) no-repeat;
`

const IconTime = styled.span`
  width: 26px;
  height: 26px;
  background: transparent url(${BgIconTimeSVG}) no-repeat;
`

const Text = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  min-width: 90px;
  font: 500 18px/26px Roboto;
  color: #1a1a1a;
`

const CertificateViewDetails = ({ size, start, end, energy, eco2 }) => {
  return (
    <>
      <PaddedWrapperDiv>
        <ContainerFlexWrapDiv>
          {start && end && (
            <FlexLargeDiv>
              <ContainerFlexNoWrapDiv>
                <GrowingDiv>
                  <HeadingDiv>Start timestamp of energy use</HeadingDiv>
                  <InputWrapDiv>
                    <InputHalfWrap>
                      <IconWrap>
                        <IconDate></IconDate>Date
                      </IconWrap>
                      <Text>{start.split('T')[0].split('-').join('/')}</Text>
                    </InputHalfWrap>
                    <InputHalfWrap>
                      <IconWrap>
                        <IconTime></IconTime>Time
                      </IconWrap>
                      <Text>{start.split('T')[1].split('.')[0]}</Text>
                    </InputHalfWrap>
                  </InputWrapDiv>
                </GrowingDiv>
                <CertificateTimeInterval
                  sTimestamp={`${start}`}
                  eTimestamp={`${end}`}
                />
                <GrowingDiv>
                  <HeadingDiv>End timestamp of energy use</HeadingDiv>
                  <InputWrapDiv>
                    <InputHalfWrap>
                      <IconWrap>
                        <IconDate></IconDate>Date
                      </IconWrap>
                      <Text>{end.split('T')[0].split('-').join('/')}</Text>
                    </InputHalfWrap>
                    <InputHalfWrap>
                      <IconWrap>
                        <IconTime></IconTime>Time
                      </IconWrap>
                      <Text>{end.split('T')[1].split('.')[0]}</Text>
                    </InputHalfWrap>
                  </InputWrapDiv>
                </GrowingDiv>
              </ContainerFlexNoWrapDiv>
            </FlexLargeDiv>
          )}
          {energy && (
            <FlexDiv>
              <ContainerFullWidthWrapDiv>
                <HeadingDiv>Electric energy use</HeadingDiv>
                <InputWrapShortDiv>{energy / 1000000} kWh</InputWrapShortDiv>
              </ContainerFullWidthWrapDiv>
            </FlexDiv>
          )}
          {size && (
            <FlexDiv>
              <ContainerFullWidthWrapDiv>
                <HeadingDiv>H2 batch size</HeadingDiv>
                <InputWrapShortDiv>{size / 1000000} kWh</InputWrapShortDiv>
              </ContainerFullWidthWrapDiv>
            </FlexDiv>
          )}
          {eco2 && (
            <FlexRoundedDiv>
              <ContainerFullWidthWrapDiv>
                <HeadingDiv>Carbon Embodiment</HeadingDiv>
                <InputWrapDiv>{eco2} g CO2e</InputWrapDiv>
              </ContainerFullWidthWrapDiv>
            </FlexRoundedDiv>
          )}
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
  background-size: 50px;
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
