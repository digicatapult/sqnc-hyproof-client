import React, { useContext } from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'
import Header from './components/Header'

import { Context } from '../utils/Context'
import { personas } from '../App'

export default function Error404() {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <MainWrapper>
        <Container>
          <Text>
            404
            <br />
            Page Not Found
          </Text>
        </Container>
      </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
  display: grid;
  grid: subgrid / subgrid;
  grid-area: 3 / 1 / -1 / -1;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-area: 1 / 1 / -1 / -1;
`

const Text = styled.h1`
  margin: auto 5px;
  text-align: center;
`
