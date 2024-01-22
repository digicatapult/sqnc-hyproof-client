import React from 'react'
import styled from 'styled-components'

import CertificateTimeInterval from './CertificateTimeInterval'

export default function CertificateInputFields() {
  return (
    <>
      <MarginedDiv>
        <ContainerFlexWrapDiv>
          <FlexLargeDiv>
            <ContainerFlexNoWrapDiv>
              <GrowingDiv>
                <InputHeadingDiv>Start timestamp of energy use</InputHeadingDiv>
                <InputWrapLeftDiv>
                  <InputHalfWrap>StartDate</InputHalfWrap>
                  <InputHalfWrap>StartTime</InputHalfWrap>
                </InputWrapLeftDiv>
              </GrowingDiv>
              <CertificateTimeInterval
                sTimestamp={'2024-01-01 00:00:00'}
                eTimestamp={'2024-01-01 23:59:59'}
              />
              <GrowingDiv>
                <InputHeadingDiv>End timestamp of energy use</InputHeadingDiv>
                <InputWrapRightDiv>
                  <InputHalfWrap>EndDate</InputHalfWrap>
                  <InputHalfWrap>EndTime</InputHalfWrap>
                </InputWrapRightDiv>
              </GrowingDiv>
            </ContainerFlexNoWrapDiv>
          </FlexLargeDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <InputHeadingDiv>Electric energy use</InputHeadingDiv>
              <InputWrapDiv>
                <InputWrap>
                  Lore ipsum dolores est sit amen test lore ipsum
                </InputWrap>
              </InputWrapDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <InputHeadingDiv>H2 batch size</InputHeadingDiv>
              <InputWrapDiv>
                <InputWrap>
                  Lore ipsum dolores est sit amen test lore ipsum
                </InputWrap>
              </InputWrapDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
        </ContainerFlexWrapDiv>
      </MarginedDiv>
    </>
  )
}

const MarginedDiv = styled.div`
  margin: 8px;

  background: #d8ffca;
`

const ContainerFlexWrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ContainerFlexNoWrapDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const FlexDiv = styled.div`
  margin: 8px 8px 45px 8px;
  height: 110px;
  line-height: 110px;
  min-width: 270px;
  flex-grow: 1;

  background: gold;
  color: black;
  font-weight: bold;
  font-size: 8px;
`

const FlexLargeDiv = styled(FlexDiv)`
  min-width: 556px;
`

const InputHeadingDiv = styled.div`
  color: #1a1a1a;
  height: 28px;
  font: 500 15px/28px Roboto;

  background: #a9ffb1;
`

const InputWrapDiv = styled.div`
  height: 82px;
  line-height: 82px;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid #a9a9a9;
  border-radius: 10px 10px 10px 10px;
  padding: 15px 0;

  background: #6cff7b;
`

const InputWrapLeftDiv = styled(InputWrapDiv)`
  border-radius: 10px 0 0 10px;
`

const InputWrapRightDiv = styled(InputWrapDiv)`
  border-radius: 0 10px 10px 0px;
`

const ContainerFullWidthWrapDiv = styled.div`
  width: 100%;
`

const GrowingDiv = styled.div`
  flex-grow: 1;
`

const InputWrap = styled.div`
  width: 100%;
  display: block;
  height: 52px;
  line-height: 52px;

  background: rgba(200, 200, 200, 0.5);
`

const InputHalfWrap = styled.div`
  width: 50%;
  display: block;
  height: 52px;
  line-height: 52px;
  float: left;

  background: rgba(200, 200, 200, 0.5);
`
