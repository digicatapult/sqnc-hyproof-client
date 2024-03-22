import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from '@digicatapult/ui-component-library'

const reasonsDummyJSON = {
  predefinedReasons: {
    0: { selection: null },
    1: { selection: null },
    2: { selection: null },
  },
  otherReason: '',
}

export default function RevokeActionsButton({
  handleRevoke,
  disabled,
  loading,
}) {
  const onClick = () => {
    const answer = window.confirm('Reason for revoking?')
    if (answer) {
      handleRevoke(reasonsDummyJSON)
    }
  }

  return (
    <LargeButton
      onClick={onClick}
      disabled={disabled}
      variant="roundedPronounced"
    >
      {!loading && 'Revoke '}
      {loading && <AnimatedSpan>...</AnimatedSpan>}
    </LargeButton>
  )
}

const LargeButton = styled(Button)`
  min-height: 60px;
  width: 100%;
  font: normal 500 21px Roboto;
  white-space: nowrap;
  color: #33e58c;
  border: 1px solid #2fe181;
  background: #124338;
  &:hover {
    opacity: 0.6;
  }
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
