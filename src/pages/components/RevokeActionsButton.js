import React, { useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Dialog } from '@digicatapult/ui-component-library'

import ReasonsPopup from './ReasonsPopup'

// ReasonsViewPopup(imports)
import { Section } from '@digicatapult/ui-component-library'
// import WarningSignSvg from '../../assets/images/warning-sign.svg'
import WarningSignSvg from '../../assets/images/warning-sign-icon.svg'

// ReasonsViewPopup
const ReasonsViewPopup = function ({ handleCancel }) {
  return (
    <>
      <Section
        headingLevel={1}
        title=""
        background="#27847a"
        headingSize="0em"
        padding="10px 141px"
      >
        <DivWarning>
          <TitleWarning>
            This hydrogen certificate has been revoked. <br />
            <SubtitleWarning>
              This certificate has been revoked by the regulator and its status
              will be reflected on the blockchain.
            </SubtitleWarning>
          </TitleWarning>
        </DivWarning>
      </Section>
      <Section
        headingLevel={2}
        title=""
        padding="35px 100px 25px 100px"
        background="#ffffff"
        headingSize="0em"
      >
        Body
        <hr />
        <button onClick={handleCancel}>Close</button>
      </Section>
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
        <ReasonsViewPopup handleCancel={dialogRevViewRef.current?.close()} />
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

// ReasonsViewPopup

const DivWarning = styled.div`
  text-align: left;
  padding: 35px 17px 30px 17px;
  margin: 0.18em;
`

const TitleWarning = styled.div`
  width: 100%;
  position: relative;

  color: #fff;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;

  // margin-left: 70px;
  // text-indent: -70px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -70px;
    margin-top: -30px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: transparent url(${WarningSignSvg}) no-repeat;
  }
`

const SubtitleWarning = styled.div`
  color: #8cb9b3;

  // margin-left: 70px;
  // padding-left: 70px;

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`
