import React from 'react'
import styled from 'styled-components'

export default function CertificateInputFields() {
  return (
    <>
      <MarginedDiv>
        <FlexContainerWrap>
          <FlexLargeItem>InfoPickerStartAndEndTime</FlexLargeItem>
          <FlexItem>InfoPickerEnergyUse</FlexItem>
          <FlexItem style={{ flexGrow: 0 }}>InfoPickerBatchSize</FlexItem>
        </FlexContainerWrap>
      </MarginedDiv>
    </>
  )
}

const MarginedDiv = styled.div`
  margin: 8px;

  background: #d8ffca;
`

const FlexContainerWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FlexItem = styled.div`
  margin: 8px 8px 45px 8px;
  height: 110px;
  line-height: 110px;
  // 24 + 86
  min-width: 270px;
  flex-grow: 1;

  background: gold;
  color: black;
  font-weight: bold;
  font-size: 8px;
  text-align: center;
`

const FlexLargeItem = styled(FlexItem)`
  min-width: 556px;
`
