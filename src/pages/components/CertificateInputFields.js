import React from 'react'
import styled from 'styled-components'

import CertificateTimeInterval from './CertificateTimeInterval'
import InputFieldDate from './InputFieldDate'
import InputFieldTime from './InputFieldTime'
import InputFieldEnergy from './InputFieldEnergy'
import InputFieldSize from './InputFieldSize'

export default function CertificateInputFields({
  sdVal,
  handleSdChgeVal,
  stVal,
  handleStChgeVal,
  edVal,
  handleEdChgeVal,
  etVal,
  handleEtChgeVal,
  enVal,
  handleEnChgeVal,
  szVal,
  handleSzChgeVal,
}) {
  return (
    <>
      <PaddedDiv>
        <ContainerFlexWrapDiv>
          <FlexLargeDiv>
            <ContainerFlexNoWrapDiv>
              <GrowingDiv>
                <InputHeadingDiv>Start timestamp of energy use</InputHeadingDiv>
                <InputWrapLeftDiv>
                  <InputHalfWrap>
                    <InputFieldDate
                      val={sdVal}
                      onChangeVal={handleSdChgeVal}
                      name="sd"
                    />
                  </InputHalfWrap>
                  <InputHalfWrap>
                    <InputFieldTime
                      val={stVal}
                      onChangeVal={handleStChgeVal}
                      name="st"
                    />
                  </InputHalfWrap>
                </InputWrapLeftDiv>
              </GrowingDiv>
              <CertificateTimeInterval
                sTimestamp={`${sdVal} ${stVal}`}
                eTimestamp={`${edVal} ${etVal}`}
              />
              <GrowingDiv>
                <InputHeadingDiv>End timestamp of energy use</InputHeadingDiv>
                <InputWrapRightDiv>
                  <InputHalfWrap>
                    <InputFieldDate
                      val={edVal}
                      onChangeVal={handleEdChgeVal}
                      name="ed"
                    />
                  </InputHalfWrap>
                  <InputHalfWrap>
                    <InputFieldTime
                      val={etVal}
                      onChangeVal={handleEtChgeVal}
                      name="et"
                    />
                  </InputHalfWrap>
                </InputWrapRightDiv>
              </GrowingDiv>
            </ContainerFlexNoWrapDiv>
          </FlexLargeDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <InputHeadingDiv>Electric energy use</InputHeadingDiv>
              <InputWrapDiv>
                <InputWrap>
                  <InputFieldEnergy
                    val={enVal}
                    onChangeVal={handleEnChgeVal}
                    name="en"
                  />
                </InputWrap>
              </InputWrapDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <InputHeadingDiv>H2 batch size</InputHeadingDiv>
              <InputWrapDiv>
                <InputWrap>
                  <InputFieldSize
                    val={szVal}
                    onChangeVal={handleSzChgeVal}
                    name="sz"
                  />
                </InputWrap>
              </InputWrapDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
        </ContainerFlexWrapDiv>
      </PaddedDiv>
    </>
  )
}

const PaddedDiv = styled.div`
  padding: 8px;
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
`

const FlexLargeDiv = styled(FlexDiv)`
  min-width: 556px;
`

const InputHeadingDiv = styled.div`
  color: #1a1a1a;
  height: 28px;
  font: 500 15px/28px Roboto;
`

const InputWrapDiv = styled.div`
  height: 82px;
  line-height: 82px;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid #a9a9a9;
  border-radius: 10px 10px 10px 10px;
  padding: 15px 0;
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
`

const InputHalfWrap = styled.div`
  width: 50%;
  height: 52px;
  line-height: 52px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`
