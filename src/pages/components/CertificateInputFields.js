import React from 'react'
import styled from 'styled-components'
import { Grid } from '@digicatapult/ui-component-library'

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
    <PaddedDiv>
      <ContainerFlexWrapDiv>
        <FlexDiv>
          <Grid
            areas={[
              ['label_start', '-', 'label_end'],
              ['inputs_start', 'interval', 'inputs_end'],
            ]}
            columns={[
              'minmax(min-content, 1fr)',
              'auto',
              'minmax(min-content, 1fr)',
            ]}
            rows={['auto', 'auto']}
          >
            <Grid.Panel area="label_start">
              <InputHeadingDiv>Start of energy use</InputHeadingDiv>
            </Grid.Panel>
            <Grid.Panel area="inputs_start">
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
            </Grid.Panel>
            <CertificateTimeInterval
              sTimestamp={`${sdVal} ${stVal}`}
              eTimestamp={`${edVal} ${etVal}`}
            />
            <Grid.Panel area="label_end">
              <InputHeadingDiv>End of energy use</InputHeadingDiv>
            </Grid.Panel>
            <Grid.Panel area="inputs_end">
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
            </Grid.Panel>
          </Grid>
        </FlexDiv>
        <FlexDiv>
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
        </FlexDiv>
        <FlexDiv>
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
        </FlexDiv>
      </ContainerFlexWrapDiv>
    </PaddedDiv>
  )
}

const PaddedDiv = styled.div`
  max-width: 900px;
  margin-inline: auto;
  padding: 8px;
  background: white;
`

const ContainerFlexWrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

const FlexDiv = styled.div`
  flex-grow: 1;
`

const InputHeadingDiv = styled.div`
  color: #1a1a1a;
  font: 500 15px Roboto;
  padding-top: 12px;
  padding-bottom: 8px;
`

const InputWrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #a9a9a9;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
`

const InputWrapLeftDiv = styled(InputWrapDiv)`
  border-radius: 10px 0 0 10px;
`

const InputWrapRightDiv = styled(InputWrapDiv)`
  border-radius: 0 10px 10px 0px;
`

const InputWrap = styled.div`
  width: 100%;
  display: block;
  height: 52px;
  line-height: 52px;
`

const InputHalfWrap = styled.div`
  height: 52px;
  line-height: 52px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`
