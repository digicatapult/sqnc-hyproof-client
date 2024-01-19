import React from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

import CertificateInputFields from './CertificateInputFields'
import CertificateFormHeader from './CertificateFormHeader'
import CertificateActionsButtons from './CertificateActionsButtons'

export default function CertificateForm() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Hello') // window.location.href = 'https://www.google.com'
  }

  return (
    <Form action="" onSubmit={handleSubmit}>
      <Timeline area="timeline">timeline</Timeline>
      <Grid.Panel area="main">
        <CertificateFormHeader />
        <CertificateInputFields />
      </Grid.Panel>
      <CertificateActionsButtons />
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
