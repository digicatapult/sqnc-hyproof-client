import React, { useRef } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import LogoSVG from '../../assets/images/hii-logo.svg'

import { Grid, AppBar, Dialog } from '@digicatapult/ui-component-library'

export default function Nav() {
  const path = window.location.pathname

  const dialogRef = useRef(null)
  const inactive = (e) => e.preventDefault()
  const showPopup = (e) => {
    e.preventDefault()
    dialogRef.current?.show()
  }

  return (
    <>
      <Home area="home">
        <Link to="/">
          <img src={LogoSVG} alt="HII Initiative Logo" height="76px" />
        </Link>
      </Home>
      <Grid.Panel area="nav">
        <AppBar
          shadow={false}
          theme={{
            primary: '#27847A',
            accent: '#FFF',
          }}
        >
          {/* OLD */}
          {/* <AppBar.Item href="/what-we-do" active={path === '/what-we-do'}>
            what we do
          </AppBar.Item> */}
          {/* <AppBar.Item
            href="/certificate"
            active={path.startsWith('/certificate')}
          >
            certificates
          </AppBar.Item> */}
          {/* OLD END */}

          {/* Inactive app item w/ Link since only Link avoids discarding the context */}
          <AppBar.Item onClick={inactive}>
            <WhiteLink onClick={showPopup}>what we do</WhiteLink>
          </AppBar.Item>
          <AppBar.Item
            onClick={inactive}
            active={path.startsWith('/certificate')}
          >
            <WhiteLink to="/certificate">certificates</WhiteLink>
          </AppBar.Item>

          {/* Alternative */}
          {/* <AppBar.Item href="." onClick={showPopup}>
            what we do
          </AppBar.Item> */}
          {/* <AppBar.Item
            href="/certificate"
            active={path.startsWith('/certificate')}
          >
            certificates
          </AppBar.Item> */}
        </AppBar>
      </Grid.Panel>
      <Dialog width="40ch" margin="20px auto" padding="9px" ref={dialogRef}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Dialog>
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

const WhiteLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #dbe9e8;
  }
`
