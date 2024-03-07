import React from 'react'
import styled from 'styled-components'

import LogoSVG from '../../assets/images/hii-logo.svg'

import { Grid, AppBar, Button } from '@digicatapult/ui-component-library'

export default function Nav() {
  return (
    <>
      <Home area="home">
        <HomeIcon>
          <img src={LogoSVG} alt="HII Initiative Logo" height="76px" />
        </HomeIcon>
      </Home>
      <Grid.Panel area="nav">
        <AppBar
          shadow={false}
          theme={{
            primary: '#27847A',
            accent: '#FFF',
          }}
        >
          <AppBar.Item>what we do</AppBar.Item>
          <AppBar.Item active={true}>certificates</AppBar.Item>
        </AppBar>
      </Grid.Panel>
    </>
  )
}

const Home = styled(Grid.Panel)`
  display: flex;
  align-items: center;
  background: white;
  overflow: hidden;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`

const HomeIcon = styled.picture``
