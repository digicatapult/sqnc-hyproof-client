import React from 'react'
import { Button } from '@digicatapult/ui-component-library'

import styled from 'styled-components'

import { Section, H1, H2 } from '@digicatapult/ui-component-library'

export default function WhoWeArePopup({ handleClick }) {
  return (
    <>
      <Section
        headingLevel={1}
        title=""
        padding="60px 100px 5px 100px"
        background="#27847a"
        headingSize="0em"
      >
        <MainHeading>What We Do</MainHeading>
        <Sub>
          Learn more about our low carbon hydrogen certification initiative,
          HyProof.
        </Sub>
      </Section>

      <Section
        headingLevel={2}
        title=""
        padding="40px 100px 30px 100px"
        background="#ffffff"
        headingSize="0em"
      >
        <Text>
          Digital Catapult is a UK government-backed organisation with over a
          decade of experience in accelerating the adoption of advanced digital
          technologies within various industries. Our mission is to accelerate
          industry adoption of advanced digital technologies, driving growth in
          the UK economy. We operate with a vendor-neutral and not-for-profit
          status.
        </Text>
        <ContentHeading>
          HyProof - Transforming Hydrogen Certification
        </ContentHeading>
        <Text>
          The HyProof certification addresses a critical need within the
          hydrogen sector: a robust and reliable certification system for
          verifying the green credentials of hydrogen production, in the
          emerging hydrogen economy. Developed in response to both industry
          concerns and government consultations, HyProof showcases the potential
          of Distributed Ledger Technology to create a decentralised, shared
          public good solution for the whole of UK.
        </Text>
        <ContentHeading>
          Why does HyProof use Distributed Ledger Technology (DLT)?
        </ContentHeading>
        <Text>
          <Ul>
            <Li>
              <span>Distributed & Secure</span>:
              <br />
              HyProof DLT reflects the multi-actor nature of the hydrogen
              ecosystem, eliminating single points of control or data loss and
              ensuring cryptographic integrity of all information.
            </Li>
            <Li>
              <span>Empowering Transparency</span>:
              <br />
              Empowers individual entities of the multi-actor ecosystem with
              greater control and sovereignty over their data, fostering trust
              and transparency within the system.
            </Li>
            <Li>
              <span>Regulatory Governance</span>:
              <br />
              HyProof DLT reflects the multi-actor nature of the hydrogen
              ecosystem, eliminating single points of control or data loss and
              ensuring cryptographic integrity of all information.
            </Li>
          </Ul>
        </Text>
        <CloseButton variant="roundedPronounced" onClick={handleClick}>
          Close
        </CloseButton>
      </Section>
    </>
  )
}

const MainHeading = styled(H1)`
  color: #ffffff;
  font: normal 500 1.6rem Roboto;
  margin-block-end: 20px;
`

const ContentHeading = styled(H2)`
  color: #1a1a1a;
  font: normal 700 1rem Roboto;

  margin-block-end: 10px;
`

const Sub = styled.p`
  color: #94c0bc;
  font: normal 500 0.8rem Roboto;
  margin-block-end: 20px;
`

const Text = styled.p`
  color: #808080;
  font: normal 500 1rem/1.5rem Roboto;
  margin-block: 0px 20px;
`

const Ul = styled.ul`
  margin-block: 0px;
  padding-inline-start: 10px;
`

const Li = styled.li`
  margin-block-end: 5.5px;
  & > span:first-child {
    font-weight: 700;
  }
`

const CloseButton = styled(Button)`
  min-height: 40px;
  min-width: 180px;
  margin-top: 10px;
  font: normal 500 1rem Roboto;
  color: #33e58c;
  border: 1px solid #2fe181;
  background: #124338;
  &:hover {
    opacity: 0.6;
  }
`
