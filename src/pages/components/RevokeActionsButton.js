import React, { useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Dialog } from '@digicatapult/ui-component-library'

import ReasonsPopup from './ReasonsPopup'

//

//
const ReasonsViewPopup = function () {
  return (
    <>
      <h1>Reasons for Revoke</h1>
    </>
  )
}

export default function RevokeActionsButton({
  handleRevoke,
  disabled,
  loading,
}) {
  const dialogRevFormRef = useRef(null)
  const dialogRevViewRef = useRef(null)
  const onRevokeClick = () => dialogRevFormRef.current?.showModal()
  const onSeeReasonClick = () => dialogRevViewRef.current?.showModal()
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
        <LargeButton onRevokeClick={onRevokeClick} variant="roundedPronounced">
          {!loading && 'Revoke '}
          {loading && <AnimatedSpan>...</AnimatedSpan>}
        </LargeButton>
      )}
      {disabled && (
        <LargeButton onClick={onSeeReasonClick} variant="roundedPronounced">
          See Reason
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
        ref={dialogRevFormRef}
      >
        <ReasonsPopup handleConfirm={handleConfirm} />
      </Dialog>
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
        ref={dialogRevViewRef}
      >
        <ReasonsViewPopup />
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
