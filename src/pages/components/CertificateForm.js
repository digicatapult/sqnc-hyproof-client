import React from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

export default function CertificateForm() {
  return (
    <Form>
      <Timeline area="timeline">timeline</Timeline>
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

const Timeline = styled(Grid.Panel)`
  display: grid;
  align-items: center;
  justify-items: center;
  min-width: 400px;
  max-height: 600px;
  color: white;
  background: #0c3b38;
`

const Sidebar = styled(Grid.Panel)`
  display: grid;
  align-items: center;
  justify-items: center;
  min-width: 400px;
  color: white;
  background: #0c3b38;
`
