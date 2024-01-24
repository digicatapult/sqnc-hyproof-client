import React from 'react'
import styled from 'styled-components'

import { Grid, Timeline } from '@digicatapult/ui-component-library'

export default function CertificateForm(props) {
  return (
    <Form>
      <TimelineWrapper area="timeline">
        <Timeline {...props}>
          {props.items.map(({ message, ...rest }) => (
            <Timeline.Item key={rest.title} {...props} {...rest}>
              {message && <p>{message}</p>}
            </Timeline.Item>
          ))}
        </Timeline>
        <TimelineDisclaimer>{props.disclaimer}</TimelineDisclaimer>
      </TimelineWrapper>
      <Grid.Panel area="main">
        <h1>Certificate Form</h1>
      </Grid.Panel>
      <Sidebar area="sidebar">Sidebar</Sidebar>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid: subgrid / subgrid;
  grid-area: 1 / 1 / -1 / -1;
`

const TimelineWrapper = styled(Grid.Panel)`
  max-width: 400px;
  max-height: 100%;
  padding: 20px 0px;
  overflow: hidden;
  background: #0c3b38;
`

const TimelineDisclaimer = styled('div')`
  padding: 50px 20px;
  color: #33e58c;
  opacity: 0.5;
  font-size: 12px;
  line-height: 20px; /* 166.667% */
`

const Sidebar = styled(Grid.Panel)`
  display: grid;
  align-items: center;
  justify-items: center;
  min-width: 400px;
  color: white;
  background: #0c3b38;
`
