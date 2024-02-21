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
  //   callApiFn({ url }).then((res) => {
  //     alert(JSON.stringify(res))
  //   })
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
                    rows={['40px', '60px']}
                    columns={['1fr', '1fr']}
                    gap="15px"
                  >
                    <Grid.Panel area="div-double">
                      CertificateViewHeader
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
  background: white;
  padding: 15px;
`
