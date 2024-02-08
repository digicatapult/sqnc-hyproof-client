import React from 'react'
import styled from 'styled-components'

import LogoPNG from '../../assets/images/hii-logo.png'
import LogoWebP from '../../assets/images/hii-logo.webp'

import { Grid, AppBar, Button } from '@digicatapult/ui-component-library'

export default function Nav() {
  return (
    <>
      <Home area="home">
        <HomeIcon>
          <source srcSet={LogoWebP} type="image/webp" />
          <source srcSet={LogoPNG} type="image/png" />
          <img src={LogoPNG} alt="HII Initiative Logo" height="80px" />
        </HomeIcon>
        <Button variant="square">Home</Button>
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
          <AppBar.Item active={true} href="/certificates">
            certificates
          </AppBar.Item>
          <AppBar.Item>contact us</AppBar.Item>
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
