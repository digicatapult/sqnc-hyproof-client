import React from 'react'
import styled from 'styled-components'

import { Section } from '@digicatapult/ui-component-library' // H4

import BgImageSVG from '../../assets/images/molecules-bg-repeat.svg'

export default function Test() {
  return (
    <>
      <GreenBgDiv>
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
              Energy Producer: <strong>Emma</strong>
            </ListItem>
            <ListItem>
              Regulator: <strong>Reginald</strong>
            </ListItem>
          </UnorderedList>
          {/* <H4 headingLevel={1}>
            <GrayText>Hydrogen Producer:</GrayText>
            <BlackStrongText>Test</BlackStrongText>
          </H4> */}
        </Section>
      </GreenBgDiv>
    </>
  )
}

const GreenBgDiv = styled.div`
  background: #228077 url(${BgImageSVG}) repeat 50%;
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

// const BlackStrongText = styled.span`
//   color: #1a1a1a;
//   font-family: Roboto;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   // line-height: 0px; /* 0% */
// `

// const GrayText = styled.span`
//   color: #7d7d7d;
//   font-family: Roboto;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   // line-height: 0px; /* 0% */
// `
