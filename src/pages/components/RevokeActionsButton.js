/* eslint-disable prettier/prettier */
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from '@digicatapult/ui-component-library'

import { useState, useCallback, useMemo } from 'react'
import { useRef } from 'react'
import { Dialog } from '@digicatapult/ui-component-library'

import { Section } from '@digicatapult/ui-component-library'
import WarningSignSvg from '../../assets/images/warning-sign-icon.svg'

// import { useEffect } from 'react'

const reasonsDefaultObj = {
  dataError: { discrepancies: false, incorrect: false, missing: false },
  certMis: { incorrect: false, unverified: false, claims: false },
  nonCompliance: { violation: false, repeated: false },
  otherReason: '',
}

const ReasonsPopup = ({ handleConfirm }) => {
  const [isConfVisible, setIsConfVisible] = useState(false)
  const [reasons, setReasons] = useState(reasonsDefaultObj)
  const update = (group, pair) => {
    setReasons({
      ...reasons,
      [group]: {
        ...reasons[group],
        [pair]: !reasons[group][pair],
      },
    })
  }
  const isValid = useMemo(() => {}, [reasons])
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
                  Submit button to cause revocation in the certification that
                  will be reflected on the blockchain.
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
            <CheckboxGroup>
              <CheckboxGroupTitle>Data Errors</CheckboxGroupTitle>
              <CheckboxContainer>
                <Span>Discrepancies in energy usage data</Span>
                <Input onChange={() => update('dataError', 'discrepancies')} />
                <CheckboxInput />
              </CheckboxContainer>
              <CheckboxContainer>
                <Span>
                  Incorrect production date/quantity/source information
                </Span>
                <Input onChange={() => update('dataError', 'incorrect')} />
                <CheckboxInput />
              </CheckboxContainer>
              <CheckboxContainer>
                <Span>Missing or incomplete data</Span>
                <Input onChange={() => update('dataError', 'missing')} />
                <CheckboxInput />
              </CheckboxContainer>
            </CheckboxGroup>

            <CheckboxGroup>
              <CheckboxGroupTitle>
                Certification Misrepresentation
              </CheckboxGroupTitle>
              <CheckboxContainer>
                <Span>Incorrect carbon intensity calculation</Span>
                <Input onChange={() => update('certMis', 'incorrect')} />
                <CheckboxInput />
              </CheckboxContainer>
              <CheckboxContainer>
                <Span>Unverified energy sources</Span>
                <Input onChange={() => update('certMis', 'unverified')} />
                <CheckboxInput />
              </CheckboxContainer>
              <CheckboxContainer>
                <Span>False claims about production process</Span>
                <Input onChange={() => update('certMis', 'claims')} />
                <CheckboxInput />
              </CheckboxContainer>
            </CheckboxGroup>

            <CheckboxGroup>
              <CheckboxGroupTitle>Non-Compliance</CheckboxGroupTitle>
              <CheckboxContainer>
                <Span>Violation of regulatory standards</Span>
                <Input onChange={() => update('nonCompliance', 'violation')} />
                <CheckboxInput />
              </CheckboxContainer>
              <CheckboxContainer>
                <Span>Repeated certificate discrepancies</Span>
                <Input onChange={() => update('nonCompliance', 'repeated')} />
                <CheckboxInput />
              </CheckboxContainer>
            </CheckboxGroup>

            <hr />
            <small>{JSON.stringify(reasons, null, 2)}</small>
            <hr />
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsConfVisible(true)
              }}
            >
              Submit
            </button>
          </Section>
        </>
      )}
      {isConfVisible && (
        <>
          The second part ( the second message ).
          <button type="submit">Cancel</button>
          <button onClick={(e) => { e.preventDefault(); handleConfirm() }}>
            Tes, revoke it
          </button>
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

  const handleConfirm = useCallback(() => {
    dialogRef.current?.close()
    // alert('handleRevoke')
    handleRevoke(reasons)
  }, [handleRevoke])

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
        width="75ch"
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

// Heading

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

// Checkboxes

const CheckboxGroup = styled.div`
  text-align: left;
  padding: 5px 0;
`

const CheckboxGroupTitle = styled.h2`
  color: #1a1a1a;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px;
`

const CheckboxContainer = styled.label`
  display: table;
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  margin-bottom: 0.4rem;

  & *,
  & *::before,
  & *::after {
    box-sizing: content-box !important;
  }

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  span {
    line-height: 1.75;
    font-size: 1rem;
    font-family: inherit;
  }
`

const CheckboxInput = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  background: #f1f5f9;
  transition: background 250ms;
  border: 1px solid #27847a;
  border-radius: 0.2rem;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 0.3rem;
    height: 0.6rem;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transition: background 250ms;
    transform: rotate(45deg);
  }

  ${CheckboxContainer} input:checked ~ &::after {
    display: block;
  }

  ${CheckboxContainer} input:disabled ~ &::after {
    border-color: #ffffff;
  }

  ${CheckboxContainer} input:checked ~ & {
    background: #27847a;
    border-color: #27847a;
  }

  ${CheckboxContainer} input:disabled ~ & {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${CheckboxContainer}:hover input:not([disabled]) ~ &,
  ${CheckboxContainer} input:focus ~ & {
    background: rgb(255, 255, 255);
    border-color: #07645a;
  }

  ${CheckboxContainer}:hover input:not([disabled]):checked ~ &,
  ${CheckboxContainer} input:checked:focus ~ & {
    background: #17746a;
    border-color: #17746a;
  }

  ${CheckboxContainer} input:focus ~ & {
    box-shadow: 0 0 0 2px #27847a;
  }
`

const Span = styled.span`
  color: #7b9390;

  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
`

const Input = styled.input.attrs({ type: 'checkbox' })``
