import React, { useState } from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

import CertificateInputFields from './CertificateInputFields'
import CertificateFormHeader from './CertificateFormHeader'
import CertificateActionsButtons from './CertificateActionsButtons'

export default function CertificateForm() {
  const [sdVal, setSdVal] = useState('2024-01-01')
  const [stVal, setStVal] = useState('00:00')
  const [edVal, setEdVal] = useState('2024-01-01')
  const [etVal, setEtVal] = useState('23:55')
  const [enVal, setEnVal] = useState('')
  const [szVal, setSzVal] = useState('')

  const handleSdChgeVal = (e) => setSdVal(e.target.value)
  const handleStChgeVal = (e) => setStVal(e.target.value)
  const handleEdChgeVal = (e) => setEdVal(e.target.value)
  const handleEtChgeVal = (e) => setEtVal(e.target.value)
  const handleEnChgeVal = (e) => setEnVal(e.target.value)
  const handleSzChgeVal = (e) => setSzVal(e.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const obj = {
      startDateVal: sdVal,
      startTimeVal: stVal,
      endDateVal: edVal,
      endTimeVal: etVal,
      energyVal: enVal,
      sizeVal: szVal,
    }
    alert('DATA:\n' + JSON.stringify(obj, null, 2)) // window.location.href = 'https://www.google.com'
  }

  return (
    <Form action="" onSubmit={handleSubmit}>
      <Timeline area="timeline">timeline</Timeline>
      <Grid.Panel area="main">
        <CertificateFormHeader />
        <CertificateInputFields
          sdVal={sdVal}
          handleSdChgeVal={handleSdChgeVal}
          stVal={stVal}
          handleStChgeVal={handleStChgeVal}
          edVal={edVal}
          handleEdChgeVal={handleEdChgeVal}
          etVal={etVal}
          handleEtChgeVal={handleEtChgeVal}
          enVal={enVal}
          handleEnChgeVal={handleEnChgeVal}
          szVal={szVal}
          handleSzChgeVal={handleSzChgeVal}
        />
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
