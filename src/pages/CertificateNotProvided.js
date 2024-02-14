import React, { useContext } from 'react'
import styled from 'styled-components'
import { Grid } from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'

import { Context } from '../utils/Context'
import { personas } from '../App'

export default function CertificateNotProvided() {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <LeftWrapper area="timeline"></LeftWrapper>
      <MainWrapper>
        <Grid.Panel area="main">
          <Container>
            <Text>
              Error - A valid certificate ID must be added to the path
              <br />
              E.g: ( /certificates/ID )
              <br />
              ---
              <br />
              Most recent certificate <br />
              ...
            </Text>
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
`

const Text = styled.h2`
  margin: auto 5px;
  text-align: center;
`
