import React from 'react'
import { Button } from '@digicatapult/ui-component-library'

import styled from 'styled-components'

import { Section, Grid } from '@digicatapult/ui-component-library'

export default function WhoWeArePopup({ handleClick }) {
  return (
    <Section headingLevel={1} title="" padding="0em 1em" headingSize="0em">
      <Grid areas={[['top'], ['bottom']]} rows={['auto']} columns={['auto']}>
        <Grid.Panel area="top">
          <Section
            headingLevel={2}
            title=""
            padding="70px 100px 5px 100px"
            margin="0 -1em"
            background="#27847a"
            headingSize="0em"
          >
            <H1>What We Do</H1>
            <Sub>
              Learn more about our low carbon hydrogen certification initiative,
              HyProof.
            </Sub>
          </Section>
        </Grid.Panel>
        <Grid.Panel area="bottom" padding="50px 100px">
          <Section
            headingLevel={2}
            title=""
            padding="50px 100px 40px 100px"
            margin="0 -1em"
            background="#ffffff"
            headingSize="0em"
          >
            <Text>
              Digital Catapult is a UK government-backed organisation with over
              a decade of experience in accelerating the adoption of advanced
              digital technologies within various industries. Our mission is to
              accelerate industry adoption of advanced digital technologies,
              driving growth in the UK economy. We operate with a vendor-neutral
              and not-for-profit status.
            </Text>
            <H2>HyProof - Transforming Hydrogen Certification</H2>
            <Text>
              The HyProof certification addresses a critical need within the
              hydrogen sector: a robust and reliable certification system for
              verifying the green credentials of hydrogen production, in the
              emerging hydrogen economy. Developed in response to both industry
              concerns and government consultations, HyProof showcases the
              potential of Distributed Ledger Technology to create a
              decentralised, shared public good solution for the whole of UK.
            </Text>
            <H2>Why does HyProof use Distributed Ledger Technology (DLT)?</H2>
            <Text>
              <Ul>
                <Li>
                  <strong>Distributed & Secure</strong>:
                  <br />
                  HyProof DLT reflects the multi-actor nature of the hydrogen
                  ecosystem, eliminating single points of control or data loss
                  and ensuring cryptographic integrity of all information.
                </Li>
                <Li>
                  <strong>Empowering Transparency</strong>:
                  <br />
                  Empowers individual entities of the multi-actor ecosystem with
                  greater control and sovereignty over their data, fostering
                  trust and transparency within the system.
                </Li>
                <Li>
                  <strong>Regulatory Governance</strong>:
                  <br />
                  HyProof DLT reflects the multi-actor nature of the hydrogen
                  ecosystem, eliminating single points of control or data loss
                  and ensuring cryptographic integrity of all information.
                </Li>
              </Ul>
            </Text>
            <CloseButton variant="roundedPronounced" onClick={handleClick}>
              Click
            </CloseButton>
          </Section>
        </Grid.Panel>
      </Grid>
    </Section>
  )
}

const H1 = styled.h1`
  color: #ffffff;
  font: normal 500 26px/0 Roboto;

  margin: 25px 0;
`

const H2 = styled.h1`
  color: #1a1a1a;
  font: normal 700 16px/0 Roboto;

  margin: 25px 0;
`

const Sub = styled.p`
  color: #94c0bc;
  font: normal 500 12px/0 Roboto;
  margin: 40px 0 40px 0;
`

const Text = styled.p`
  color: #808080;

  font: normal 500 14px/24.5px Roboto;
`

const Ul = styled.ul`
  padding-inline-start: 10px;
`

const Li = styled.li`
  margin-bottom: 5.5px;
`

const CloseButton = styled(Button)`
  min-height: 40px;
  min-width: 180px;
  margin-top: 30px;
  font: normal 500 15px/15px Roboto;
  color: #33e58c;
  border: 1px solid #2fe181;
  background: #124338;
  &:hover {
    opacity: 0.6;
  }
`
