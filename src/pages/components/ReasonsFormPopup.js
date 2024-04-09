import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Button, Section } from '@digicatapult/ui-component-library'

import WarningSignSvg from '../../assets/images/warning-sign-icon.svg'

const reasonsDefaultObj = {
  dataError: { discrepancies: false, incorrect: false, missing: false },
  certMis: { incorrect: false, unverified: false, claims: false },
  nonCompliance: { violation: false, repeated: false },
  otherReason: '',
}

export default function ReasonsFormPopup({ handleConfirm }) {
  const [isConfVisible, setIsConfVisible] = useState(false)
  const [reasons, setReasons] = useState(reasonsDefaultObj)
  const isValid = useMemo(() => {
    const hasAtLeastOneItem = Object.values(reasons)
      .flatMap((o) => Object.values(o))
      .some((v) => v === true)
    const hasOtherReason = reasons.otherReason.trim().length > 0
    return hasAtLeastOneItem || hasOtherReason
  }, [reasons])
  const update = (group, pair) => {
    setReasons({
      ...reasons,
      [group]: {
        ...reasons[group],
        [pair]: !reasons[group][pair],
      },
    })
  }
  const change = (text) => {
    setReasons({ ...reasons, otherReason: text })
  }
  return (
    <>
      {!isConfVisible && (
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
                Please provide the reason: <br />
                <SubtitleWarning>
                  Click the submit button to revoke the certificate.
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

            <CheckboxGroup>
              <CheckboxGroupTitle>Other</CheckboxGroupTitle>
              <Textarea
                value={reasons?.otherReason}
                onChange={(e) => change(e.target.value)}
                type="text"
                placeholder="Please provide details in the text box below."
                rows={3}
              ></Textarea>
            </CheckboxGroup>

            <SubmitButton
              variant="roundedPronounced"
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault()
                setIsConfVisible(true)
              }}
            >
              Submit
            </SubmitButton>
          </Section>
        </>
      )}
      {isConfVisible && (
        <>
          <Section
            headingLevel={1}
            title=""
            background="#27847a"
            headingSize="0em"
            padding="10px 37px"
          >
            <DivWarning>
              <TitleWarning>
                Would you really like to revoke this certificate?
              </TitleWarning>
            </DivWarning>
            <DivContainer>
              <DivHalf>
                <CancelButton type="submit" variant="roundedPronounced">
                  Cancel
                </CancelButton>
              </DivHalf>
              <DivHalf>
                <SubmitButton
                  onClick={(e) => {
                    e.preventDefault()
                    handleConfirm(reasons)
                  }}
                  variant="roundedPronounced"
                >
                  Yes, revoke it
                </SubmitButton>
              </DivHalf>
            </DivContainer>
          </Section>
        </>
      )}
    </>
  )
}

const DivWarning = styled.div`
  text-align: left;
  padding: 35px 17px 30px 17px;
  margin: 0.18em 0 0.18em 2em;
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

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

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

const Textarea = styled.textarea`
  width: 100%;
  color: #7b9390;
  padding: 10px 30px;

  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;

  height: 102px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #a9a9a9;
  padding-top: 20px;
  resize: none;

  &:focus {
    outline: none !important;
    border: 1px solid #27847a;
  }
`

const SubmitButton = styled(Button)`
  min-height: 40px;
  min-width: 180px;
  margin-top: 15px;
  margin-bottom: 10px;
  font: normal 500 1rem Roboto;
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
  &:disabled:hover {
    opacity: 1;
  }
`

const DivContainer = styled.div`
  margin: 10px auto;
  padding: 0px 75px;
`

const DivHalf = styled.div`
  display: inline-block;
  width: 50%;
  height: 65px;
`

const CancelButton = styled(Button)`
  min-height: 40px;
  min-width: 180px;
  margin-top: 15px;
  margin-bottom: 10px;
  font: normal 500 1rem Roboto;
  color: #ffffff;
  border: 1px solid #ffffff;
  background: #27847a;
  &:hover {
    opacity: 0.6;
  }
`
