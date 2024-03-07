import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Grid, Button } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons({
  data,
  error,
  loading,
  valid,
}) {
  const handleClickSaveDraft = (e) => {
    e.preventDefault()
    alert('Saved')
  }
  const handleCancelDraft = (e) => {
    e.preventDefault()
    alert('Cancelled')
  }

  return (
    <Sidebar area="sidebar">
      <PaddedDiv>
        <SmallButton variant="roundedPronounced" onClick={handleClickSaveDraft}>
          Save draft
        </SmallButton>

        <SmallButton variant="roundedPronounced" onClick={handleCancelDraft}>
          Cancel
        </SmallButton>

        <LargeButton disabled={loading || !valid} variant="roundedPronounced">
          {loading == false && data == null && <Span>Submit</Span>}
          {loading == false && data != null && <Span>Submitted</Span>}
          {loading && <AnimatedSpan>...</AnimatedSpan>}
          {error && <Span>Error</Span>}
        </LargeButton>
      </PaddedDiv>
    </Sidebar>
  )
}

const Sidebar = styled(Grid.Panel)`
  align-items: center;
  justify-items: center;
  color: white;
  background: #0c3b38;
`

const PaddedDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 34px 21px;
`

const SmallButton = styled(Button)`
  flex: 1 0 110px;
  min-height: 40px;
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
  font-size: 15.5px;
  color: #ffffff;
  border: 1px solid #ffffff;
  background: #124338;
  &:hover {
    opacity: 0.6;
  }
`

const LargeButton = styled(SmallButton)`
  min-width: 100%;
  min-height: 60px;
  font-size: 21px;
  color: #33e58c;
  border: 1px solid #2fe181;
  background: #124338;
  &:disabled {
    color: #1c774a;
    border: 1px solid #1c774a;
  }
`

const RevealAnimation = keyframes`
  from {
    width: 0px;
  }
  to {
    width: 22px;
  }
`

const AnimatedSpan = styled.span`
  overflow: hidden;
  display: inline-flex;
  white-space: nowrap;
  margin: 0 auto;
  animation: ${RevealAnimation} 1s steps(4, end) infinite;
`

const Span = styled.span``
