/* eslint-disable prettier/prettier */
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from '@digicatapult/ui-component-library'

import { useState } from 'react'
import { useRef } from 'react'
import { Dialog } from '@digicatapult/ui-component-library'

import { Section } from '@digicatapult/ui-component-library'
import WarningSignSvg from '../../assets/images/warning-sign-icon.svg'

// import { useEffect } from 'react'

const reasonsDummyJSON = {
  predefinedReasons: {
    0: { selection: null },
    1: { selection: null },
    2: { selection: null },
  },
  otherReason: '',
}

const ReasonsPopup = ({ handleConfirm }) => {
  const [isConfVisible, setIsConfVisible] = useState(false)
  return (
    <>
      {!isConfVisible && (
        <>
          <Section
            headingLevel={1}
            title=""
            background="#27847a"
            headingSize="0em"
          >
            <DivWarning>
              <TitleWarning>
                Please provide the reason: <br />
                <SubtitleWarning>
                  Submit button to cause revocation in the certification that will
                  be reflected on the blockchain.
                </SubtitleWarning>
              </TitleWarning>
            </DivWarning>
          </Section>

          <Section
            headingLevel={2}
            title=""
            padding="50px 100px 40px 100px"
            background="#ffffff"
            headingSize="0em"
          >
            <button onClick={(e) => { e.preventDefault(); setIsConfVisible(true) }}>Submit</button>
          </Section>
        </>
      )}
      {isConfVisible && (
        <>
          The second part. Lorem ipsum dolor est testing
          <button type="submit">Cancel</button>
          <button onClick={(e) => { e.preventDefault(); handleConfirm() }}>Tes, revoke it</button>
        </>
      )}
    </>
  )
}

export default function RevokeActionsButton({
  handleRevoke,
  disabled,
  loading,
}) {
  const dialogRef = useRef(null)
  const onClick = () => dialogRef.current?.showModal()

  // useEffect(() => { dialogRef.current?.showModal() }, [])

  const handleConfirm = () => {
    dialogRef.current?.close()
    // alert('handleRevoke')
    handleRevoke(reasonsDummyJSON)
  }

  return (
    <>
      <LargeButton
        onClick={onClick}
        disabled={disabled}
        variant="roundedPronounced"
      >
        {!loading && 'Revoke '}
        {loading && <AnimatedSpan>...</AnimatedSpan>}
      </LargeButton>
      <Dialog
        width="70ch"
        maxHeight="90lvh"
        margin="auto auto"
        padding="0px"
        modalBackdropColor="rgba(26, 26, 26, 0.9)"
        borderRadius="0px"
        boxShadow="0px"
        includeClose={false}
        useModal={true}
        //
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

//

const DivWarning = styled.div`
  text-align: left;
  padding: 35px 17px 30px 17px;
`

const TitleWarning = styled.span`
  width: 100%;
  position: relative;

  color: #fff;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 13px;

  margin-left: 70px;

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

  margin-left: 70px;

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`
