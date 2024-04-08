import React, { useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Dialog } from '@digicatapult/ui-component-library'

import ReasonsPopup from './ReasonsPopup'

export default function RevokeActionsButton({
  handleRevoke,
  disabled,
  loading,
}) {
  const dialogRef = useRef(null)
  const onClick = () => dialogRef.current?.showModal()
  const handleConfirm = useCallback(
    (r) => {
      dialogRef.current?.close()
      handleRevoke(r)
    },
    [handleRevoke]
  )

  return (
    <>
      {!disabled && (
        <LargeButton
          onClick={onClick}
          disabled={false}
          variant="roundedPronounced"
        >
          {!loading && 'Revoke '}
          {loading && <AnimatedSpan>...</AnimatedSpan>}
        </LargeButton>
      )}
      <Dialog
        width="75ch"
        maxHeight="90lvh"
        margin="auto auto"
        padding="0px"
        modalBackdropColor="rgba(26, 26, 26, 0.9)"
        borderRadius="0px"
        boxShadow="0px"
        includeClose={true}
        useModal={true}
        ref={dialogRef}
      >
        <ReasonsPopup handleConfirm={handleConfirm} />
      </Dialog>
    </>
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
