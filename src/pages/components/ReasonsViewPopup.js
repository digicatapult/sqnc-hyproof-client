import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@digicatapult/ui-component-library'

// ReasonsViewPopup(imports)
import { Section } from '@digicatapult/ui-component-library'
import WarningSignSvg from '../../assets/images/warning-sign-icon.svg'

// ApiStuff
import { personas } from '../../App'
import { Context } from '../../utils/Context'
import useAxios from '../../hooks/use-axios'

const email = 'reginald@hydrogenregulator.org.uk'

export default function ReasonsViewPopup({ handleCancel, reason }) {
  const { current } = useContext(Context)
  const { origin } = personas.find(({ id }) => id === current)
  const url = `${origin}/v1/attachment/${reason}`
  const hasTrue = (o) => (!o ? false : Object.values(o).some((v) => v === true))
  const { data /*, error, loading */ } = useAxios(true, url)
  if (loading) return <>Loading...</>
  if (error) return <>Error: {JSON.stringify(error)}</>
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
                  {data.dataError?.discrepancies && 'discrepancies; '}
                  {data.dataError?.incorrect && 'incorrect; '}
                  {data.dataError?.missing && 'missing; '}
                </Span>
              </Li>
            )}
            {hasTrue(data?.certMis) && (
              <Li>
                Certification Misrepresentation:{' '}
                <Span>
                  {data.certMis?.incorrect && 'incorrect; '}
                  {data.certMis?.unverified && 'unverified; '}
                  {data.certMis?.claims && 'claims; '}
                </Span>
              </Li>
            )}
            {hasTrue(data?.nonCompliance) && (
              <Li>
                Non-Compliance:{' '}
                <Span>
                  {data.nonCompliance?.violation && 'violation; '}
                  {data.nonCompliance?.repeated && 'repeated; '}
                </Span>
              </Li>
            )}
            {data?.otherReason && (
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
            <a href="mailto:{email}">{email}</a> for for more information on
            certificate revocation procedures to discuss next steps.
          </Text>
        </TextSection>
        {/* DebugInfo */}
        <TextSection>
          <Text>
            <small>{data && JSON.stringify(data)}</small>
          </Text>
        </TextSection>
        {/* DebugInfoEnd */}
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

const Span = styled.span``
