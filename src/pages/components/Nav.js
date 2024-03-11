import React, { useRef } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import { Grid, AppBar, Dialog } from '@digicatapult/ui-component-library'

import LogoSVG from '../../assets/images/hii-logo.svg'
import WhoWeArePopup from './WhoWeArePopup'

export default function Nav() {
  const path = window.location.pathname

  const dialogRef = useRef(null)
  const inactive = (e) => e.preventDefault()
  const showPopup = (e) => {
    e.preventDefault()
    dialogRef.current?.showModal()
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
          <AppBar.Item onClick={inactive}>
            <WhiteLink onClick={showPopup}>what we do</WhiteLink>
          </AppBar.Item>
          <AppBar.Item
            onClick={inactive}
            active={path.startsWith('/certificate')}
          >
            <WhiteLink to="/certificate">certificates</WhiteLink>
          </AppBar.Item>
        </AppBar>
      </Grid.Panel>
      <Dialog
        width="99ch"
        height="95ch"
        margin="40px auto"
        padding="0px"
        modalBackdropColor="rgba(26, 26, 26, 0.9)"
        borderRadius="0px"
        useModal={true}
        ref={dialogRef}
      >
        <WhoWeArePopup />
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
