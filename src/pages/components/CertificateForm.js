import React from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

import CertificateFormHeader from './CertificateFormHeader'

export default function CertificateForm() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Hello')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Timeline area="timeline">timeline</Timeline>
      <Grid.Panel area="main">
        <CertificateFormHeader />
        <div>StartAndEndTime</div>
        <div>EnergyUsage</div>
        <div>HydrogenBatchSize</div>
        <div>TimeOfProduction</div>
      </Grid.Panel>
      <Sidebar area="sidebar">
        <button type="submit">Submit</button>
      </Sidebar>
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
