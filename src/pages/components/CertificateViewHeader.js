import React from 'react'
import styled from 'styled-components'

import ApprovalSealLargeSVG from '../../assets/images/approval-seal-large.svg'

export default function CertificateViewHeader({ id }) {
  return (
    <HeaderContainerUnderlined>
      <HeaderContainer>
        <HeaderImage />
        <HeaderTextHeadings>
          <H1>CERTIFICATE</H1>
          <H2>HYDROGEN PRODUCTION</H2>
          <H3>{id?.indexOf('-') > 0 ? id : `UK-HYPROOF-${id}`}</H3>
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

  color: #27847a;
`

const H1 = styled.h1`
  display: block;
  font-family: Roboto;
  font-size: 57px;
  font-style: normal;
  font-weight: 300;
  margin-top: 0px;
  margin-bottom: -6px;
  // line-height: 0px;
`

const H2 = styled.h2`
  display: block;
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  margin-top: -6px;
  margin-bottom: 2px;
  // line-height: 0px;
`

const H3 = styled.h3`
  display: block;
  font-family: Roboto;
  font-size: 18.5px;
  font-style: normal;
  font-weight: 300;
  margin-top: 0px;
  // line-height: 0px;
`
