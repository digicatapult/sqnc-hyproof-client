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

import ApprovalSealLargeSVG from '../assets/images/approval-seal-large.svg'

const CertificateViewHeader = () => {
  return (
    <HeaderContainerUnderlined>
      <HeaderContainer>
        <HeaderImage />
        <HeaderTextHeadings>
          <H1>CERTIFICATE</H1>
          <H2>HYDROGEN PRODUCTION</H2>
          <H3>HYDROGEN PRODUCTION</H3>
        </HeaderTextHeadings>
        <HeaderImage />
      </HeaderContainer>
    </HeaderContainerUnderlined>
  )
}

const HeaderContainerUnderlined = styled.div`
  border-bottom: 2px solid #27847a;
  width: 100%;
`

const HeaderContainer = styled.div`
  margin: 66px auto 20px auto;
  width: 100%;
`

const HeaderImage = styled.div`
  display: inline-block;
  padding: 10px;
  width: 16.5%;
  height: 100px;
  border: 1px solid black;

  background: transparent url(${ApprovalSealLargeSVG}) no-repeat center;
  background-size: contain;

  @media (max-width: 1200px) {
    display: none;
  }
`

const HeaderTextHeadings = styled.div`
  display: inline-block;
  padding: 0 10px;
  width: 66%;
  border: 1px solid black;

  // min-width: 500px;
  // min-width: 433px;

  color: #27847a;
`

const H1 = styled.h1`
  display: block;
  font-family: Roboto;
  font-size: 57px;
  font-style: normal;
  font-weight: 300;
  // line-height: 0px;
  margin-top: 0px;
  margin-bottom: -9px;
`

const H2 = styled.h2`
  display: block;
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  // line-height: 0px;
  margin-top: -9px;
  margin-bottom: -3px;
`

const H3 = styled.h3`
  display: block;
  font-family: Roboto;
  font-size: 18.5px;
  font-style: normal;
  font-weight: 300;
  margin-top: -2px;
  // line-height: 0px;
`

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
                      ['div-double', 'div-double'],
                      ['div-left', 'div-right'],
                    ]}
                    rows={['auto', 'auto']}
                    columns={['1fr', '1fr']}
                    gap="15px"
                  >
                    <Grid.Panel area="div-double">
                      <CertificateViewHeader />
                    </Grid.Panel>
                    <Grid.Panel area="div-left">
                      CertificateViewOwnership
                    </Grid.Panel>
                    <Grid.Panel area="div-right">
                      CertificateViewDetails
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
  background: #ffffff;
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
    border-color: transparent #27847a #ffffff transparent;
    background: transparent;
    display: block;
    width: 0;
  }
`
