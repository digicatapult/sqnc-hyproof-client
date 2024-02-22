import React from 'react'
import styled from 'styled-components'

import { Grid, UserIcon } from '@digicatapult/ui-component-library'

import LiveIndicatorSVG from '../../assets/images/liveIndicator.svg'

export default function Header({ name, company, background }) {
  return (
    <StyledHeader area="header">
      <UserIcon
        fullName={name}
        bgColor={background}
        outlineColor="white"
        color="#1A1A1A"
        size="70px"
      />
      <CompanyName>{company}</CompanyName>
      <LiveIndicator>
        <source srcSet={LiveIndicatorSVG} type="image/png" />
        <img
          src={LiveIndicatorSVG}
          alt="Icon indicating certification system is live"
          height="32px"
          width="32px"
        />
      </LiveIndicator>
      <LiveCert>Live Certification</LiveCert>
    </StyledHeader>
  )
}

const StyledHeader = styled(Grid.Panel)`
  color: white;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 33px;
  align-items: center;
  background: #1a1a1a;
  width: 100%;
  height: 100%;
  padding: 0px 28px;
`

const CompanyName = styled.span`
  font-family: Roboto;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 45px;
  white-space: nowrap;
`

const LiveIndicator = styled.picture``

const LiveCert = styled.span`
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 36.746px;
  padding-left: 33px;
  border-left: 2px solid white;
`
