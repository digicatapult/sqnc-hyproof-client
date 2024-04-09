import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Section } from '@digicatapult/ui-component-library'

import WarningSignSvg from '../../assets/images/warning-sign-icon.svg'

import { personas } from '../../App'
import { Context } from '../../utils/Context'
import useAxios from '../../hooks/use-axios'

const defaultEmail = 'reginald@hydrogenregulator.org.uk'

export default function ReasonsViewPopup({ handleCancel, reason }) {
  const { current } = useContext(Context)
  const { origin } = personas.find(({ id }) => id === current)
  const url = `${origin}/v1/attachment/${reason}`
  const hasTrue = (o) => (!o ? false : Object.values(o).some((v) => v === true))
  const hasOther = (s) => (!s ? false : true)
  const { data, error, loading } = useAxios(true, url)
  if (loading) return <AnimatedSpan>...</AnimatedSpan>
  if (error) return <Error>Error: {JSON.stringify(error)}</Error>

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
              this certificate has been revoked by the regulator.
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
        <TextSection>
          <TextTitle>Reason(s) for Revocation:</TextTitle>
          <Ol>
            {hasTrue(data?.dataError) && (
              <Li>
                Data Errors:{' '}
                <Span>
                  {data.dataError?.discrepancies &&
                    'Discrepancies in energy usage data; '}
                  {data.dataError?.incorrect &&
                    'Incorrect production date/quantity/source information; '}
                  {data.dataError?.missing && 'Missing or incomplete data; '}
                </Span>
              </Li>
            )}
            {hasTrue(data?.certMis) && (
              <Li>
                Certification Misrepresentation:{' '}
                <Span>
                  {data.certMis?.incorrect &&
                    'Incorrect carbon intensity calculation; '}
                  {data.certMis?.unverified && 'Unverified energy sources; '}
                  {data.certMis?.claims &&
                    'False claims about production process; '}
                </Span>
              </Li>
            )}
            {hasTrue(data?.nonCompliance) && (
              <Li>
                Non-Compliance:{' '}
                <Span>
                  {data.nonCompliance?.violation &&
                    'Violation of regulatory standards; '}
                  {data.nonCompliance?.repeated &&
                    'Repeated certificate discrepancies; '}
                </Span>
              </Li>
            )}
            {hasOther(data?.otherReason) && (
              <Li>
                Other: <Span>{data?.otherReason}</Span>
              </Li>
            )}
          </Ol>
        </TextSection>
        <TextSection>
          <TextTitle>What to Do:</TextTitle>
          <Text>
            Please contact the regulatory body at{' '}
            <a href={`mailto:${defaultEmail}`}>{defaultEmail}</a> for more
            information on certificate revocation procedures to discuss next
            steps.
          </Text>
        </TextSection>
        <CloseButton variant="roundedPronounced" onClick={handleCancel}>
          Close
        </CloseButton>
      </Section>
    </>
  )
}

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

const TextSection = styled.div`
  text-align: left;
  padding: 5px 0;
  margin-bottom: 20px;
`

const TextTitle = styled.div`
  padding: 15px 0;
  color: #1a1a1a;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px;
`

const Text = styled.div`
  color: #859d9b;

  & a {
    color: #859d9b;
  }
  & a:hover {
    color: #1a1a1a;
  }
`

const Ol = styled.ol`
  margin-block: 0px;
  line-height: 24px;
  padding-left: 25px;
  padding-inline-start: 25px;
`

const Li = styled.li`
  margin-block-end: 5.5px;
  color: #859d9b;
`

const CloseButton = styled(Button)`
  min-height: 40px;
  min-width: 180px;
  margin-top: 30px;
  font: normal 500 1rem Roboto;
  color: #33e58c;
  border: 1px solid #2fe181;
  background: #124338;
  &:hover {
    opacity: 0.6;
  }
`

const Error = styled.div`
  padding: 50px 17px 50px 17px;
  color: #000000;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
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
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100px;

  overflow: hidden;
  display: inline-flex;
  white-space: nowrap;
  margin: 0 auto;
  animation: ${RevealAnimation} 1s steps(4, end) infinite;
`

const Span = styled.span``
