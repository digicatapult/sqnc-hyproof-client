import React, { useState } from 'react'
import styled from 'styled-components'

import CertificateTimeInterval from './CertificateTimeInterval'
import InputFieldDate from './InputFieldDate'
import InputFieldTime from './InputFieldTime'
// TODO: Import energy usage and bash size

export default function CertificateInputFields() {
  const [sdVal, setSdVal] = useState('2024-01-01')
  const [stVal, setStVal] = useState('00:00')
  const [edVal, setEdVal] = useState('2024-01-01')
  const [etVal, setEtVal] = useState('23:55')
  // TODO: Add: enVal, setEnVal & szVal, setSzVal

  const handleSdChgeVal = (e) => setSdVal(e.target.value)
  const handleStChgeVal = (e) => setStVal(e.target.value)
  const handleEdChgeVal = (e) => setEdVal(e.target.value)
  const handleEtChgeVal = (e) => setEtVal(e.target.value)
  // TODO: Add handleEnChgeVal & handleSzChgeVal

  return (
    <>
      <MarginedDiv>
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
                      id="sd"
                    />
                  </InputHalfWrap>
                  <InputHalfWrap>
                    <InputFieldTime
                      val={stVal}
                      onChangeVal={handleStChgeVal}
                      name="st"
                      id="st"
                    />
                  </InputHalfWrap>
                </InputWrapLeftDiv>
              </GrowingDiv>
              <CertificateTimeInterval
                // sTimestamp={'2024-01-01 00:00:00'} eTimestamp={'2024-02-01 23:59:59'}
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
                      id="ed"
                    />
                  </InputHalfWrap>
                  <InputHalfWrap>
                    <InputFieldTime
                      val={etVal}
                      onChangeVal={handleEtChgeVal}
                      name="et"
                      id="et"
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
                  InputFieldEnergy ( &lt;InputFieldEnergy /&gt; )
                </InputWrap>
              </InputWrapDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <InputHeadingDiv>H2 batch size</InputHeadingDiv>
              <InputWrapDiv>
                <InputWrap>
                  InputFieldSize ( &lt;InputFieldSize /&gt; )
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
  // padding-left: 15px;

  background: rgba(200, 200, 200, 0.5);
`

const InputHalfWrap = styled.div`
  width: 50%;
  display: block;
  height: 52px;
  line-height: 52px;
  float: left;
  // padding-left: 15px;

  background: rgba(200, 200, 200, 0.5);
`
