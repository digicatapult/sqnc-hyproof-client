import React from 'react'

import styled from 'styled-components'

import { Section, Grid } from '@digicatapult/ui-component-library'

export default function WhoWeArePopup() {
  return (
    <Section headingLevel={1} title="" padding="0em 1em" headingSize="0em">
      <Grid areas={[['top'], ['bottom']]} rows={['auto']} columns={['auto']}>
        <Grid.Panel area="top">
          <Section
            headingLevel={2}
            title=""
            padding="50px 100px 5px 100px"
            margin="0 -1em"
            background="#27847a"
            headingSize="0em"
          >
            <H1>Title</H1>
            <Sub>Sub</Sub>
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
            <H2>Title</H2>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Test
              <Ul>
                <Li>
                  <strong>THE FIRST BULLET POINT IN BOLD:</strong>
                  <br />
                  Text with indent
                </Li>
                <Li>
                  <strong>THE SECOND ONE WITH BOLD:</strong>
                  <br />
                  More text
                </Li>
              </Ul>
            </Text>
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

  font: normal 500 14px/24px Roboto;
`

const Ul = styled.ul`
  padding-inline-start: 10px;
`

const Li = styled.li`
  margin-bottom: 5px;
`
