import React from 'react'

// import styled from 'styled-components'

import { Section, Grid } from '@digicatapult/ui-component-library'

export default function WhoWeArePopup() {
  return (
    <Section headingLevel={1} title="" padding="0em 1em" headingSize="0em">
      <Grid areas={[['top'], ['bottom']]} rows={['auto']} columns={['auto']}>
        <Grid.Panel area="top">
          <Section
            headingLevel={2}
            title=""
            padding="50px 100px"
            margin="0 -1em"
            background="#27847a"
            headingSize="0em"
          >
            <h3>Title</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Test
          </Section>
        </Grid.Panel>
        <Grid.Panel area="bottom" padding="50px 100px">
          <Section
            headingLevel={2}
            title=""
            padding="50px 100px"
            margin="0 -1em"
            background="#ffffff"
            headingSize="0em"
          >
            <h3>Title</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Test
          </Section>
        </Grid.Panel>
      </Grid>
    </Section>
  )
}
