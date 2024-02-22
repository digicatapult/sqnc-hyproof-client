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

const CertificateViewOwnership = ({ hOwner, eOwner }) => {
  return (
    <>
      <DivLock>
        <SpanLock>UK-HYPROOF-0001</SpanLock>
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
                        hOwner={data?.hydrogen_owner}
                        eOwner={data?.energy_owner}
                      />
                    </Grid.Panel>
                    <Grid.Panel area="div-details">
                      CertificateViewDetails
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
