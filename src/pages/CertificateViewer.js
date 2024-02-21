import React, { useContext, useEffect } from 'react'
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

  // Read the JSON that represents the cert once
  useEffect(() => {
    const path = `/v1/certificate/${id}`
    const url = `${origin}${path}`
    callApiFn({ url }).then((res) => {
      alert(JSON.stringify(res))
    })
  }, [id, origin, callApiFn])

  if (error) return <>Err:{JSON.stringify(error)}</>

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <LeftWrapper area="timeline"></LeftWrapper>
      <MainWrapper>
        <Grid.Panel area="main">
          <Container>
            <Paper>
              CertificateViewer (viewing ID {id}) <br />
              ...
            </Paper>
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
  background: #27847a;
  padding: 34px;
  height: 100%;
  align-content: start;
`

const Paper = styled.div`
  margin: auto 5px;
  background: white;
  // text-align: top;
`
