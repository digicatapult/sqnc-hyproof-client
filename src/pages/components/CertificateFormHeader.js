import React from 'react'
import styled from 'styled-components'

import { Section } from '@digicatapult/ui-component-library'

import BgImageSVG from '../../assets/images/molecules-bg-repeat.svg'

export default function CertificateFormHeader() {
  return (
    <GreenBgDiv>
      <WrapperDiv>
        <Section
          background="#e4e4e4"
          headingGap="0ch"
          headingLevel={3}
          headingSize="0em"
          height="auto"
          padding="1ch 1ch"
          title=""
          width="33%"
        >
          <UnorderedList>
            <ListItem>
              Hydrogen Producer: <strong>Heidi</strong>
            </ListItem>
            <ListItem>
              Energy Supplier: <strong>Emma</strong>
            </ListItem>
            <ListItem>
              Regulator: <strong>Reginald</strong>
            </ListItem>
          </UnorderedList>
        </Section>
      </WrapperDiv>
    </GreenBgDiv>
  )
}

const WrapperDiv = styled.div`
  min-width: 250px;
`

const GreenBgDiv = styled.div`
  background: #228077 url(${BgImageSVG}) repeat;
  background-size: 100px;
`

const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  font-weight: 900;
  padding: 0;
`

const ListItem = styled.li`
  color: #1a1a1a;
  font-family: Roboto;
  font-weight: 100;
  font-size: 16px;
`
