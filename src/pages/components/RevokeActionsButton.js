import React, { useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Dialog } from '@digicatapult/ui-component-library'

import ReasonsPopup from './ReasonsFormPopup'
import ReasonsViewPopup from './ReasonsViewPopup'

export default function RevokeActionsButton({
  handleRevoke,
  disabled,
  loading,
  reason,
}) {
  const dialogRevFormRef = useRef(null)
  const dialogRevViewRef = useRef(null)
  const onRevokeClick = () => dialogRevFormRef.current?.showModal()
  const onSeeReasonClick = () => dialogRevViewRef.current?.showModal()
  const handleConfirm = useCallback(
    (r) => {
      dialogRevFormRef.current?.close()
      handleRevoke(r)
    },
    [handleRevoke]
  )
  const handleViewCancel = () => dialogRevViewRef.current?.close()

  return (
    <>
      {!disabled && (
        <LargeButton onClick={onRevokeClick} variant="roundedPronounced">
          {!loading && 'Revoke '}
          {loading && <AnimatedSpan>...</AnimatedSpan>}
        </LargeButton>
      )}
      {disabled && (
        <LargeButton onClick={onSeeReasonClick} variant="roundedPronounced">
          See Reason
        </LargeButton>
      )}
      {!disabled && (
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
      )}
      {disabled && reason && (
        <Dialog
          width="95ch"
          maxHeight="90lvh"
          margin="auto auto"
          padding="0px"
          modalBackdropColor="rgba(26, 26, 26, 0.9)"
          borderRadius="0px"
          boxShadow="0px"
          includeClose={false}
          useModal={true}
          ref={dialogRevViewRef}
        >
          <ReasonsViewPopup handleCancel={handleViewCancel} reason={reason} />
        </Dialog>
      )}
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
