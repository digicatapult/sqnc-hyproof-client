import React from 'react'
import styled from 'styled-components'

import LockerSvg from '../../assets/images/locker-icon.svg'
import SealSvg from '../../assets/images/approval-seal-small.svg'

export default function CertificateViewOwnership({ id, hOwner, eOwner }) {
  return (
    <>
      <DivLock>
        <SpanLock>{id?.indexOf('-') > 0 ? id : `UK-HYPROOF-${id}`}</SpanLock>
      </DivLock>
      <DivRounded>
        <Div>Hydrogen Owner: {hOwner}</Div>
        <Div>Energy Owner: {eOwner}</Div>
        <Hr />
        <DivImageLeft>
          <Div>Hydrogen Certificate</Div>
          <Small>Adherence to offical standards</Small>
        </DivImageLeft>
      </DivRounded>
    </>
  )
}

const DivLock = styled.div`
  text-align: left;
`

const SpanLock = styled.span`
  width: 100%;
  position: relative;
  color: #4e9a91;
  font-family: Roboto;
  font-size: 18.4px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  margin-left: 45px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -45px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    border-radius: 50%;
    background: #1f7d74 url(${LockerSvg}) no-repeat;
  }
`

const DivRounded = styled.div`
  border-radius: 10px;
  background: #27847a;
  color: #ffffff;
  padding: 30px 20px 20px 20px;
  margin: 8px 0;
  text-align: left;

  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

const Div = styled.div`
  line-height: 30px;
  margin: 10px 0 0 0;
`

const Hr = styled.hr`
  border-style: solid;
  margin: 40px 0 20px 0;
`

const DivImageLeft = styled.div`
  width: 100%;
  position: relative;
  color: #ffffff;
  font-family: Roboto;
  font-size: 18.4px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  padding-left: 44px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0px;
    margin-top: -25px;
    width: 34px;
    height: 50px;
    background: transparent url(${SealSvg}) no-repeat;
  }
`

const Small = styled.small`
  color: #94c0bc;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  display: block;
`
