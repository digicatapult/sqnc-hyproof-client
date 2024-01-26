import React, { useState } from 'react'
import styled from 'styled-components'

import { Grid, Button } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons() {
  // START
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // END

  const [isWaitingVal, setIsWaitingVal] = useState(false)

  const handleClickSaveDraft = (e) => {
    e.preventDefault()
    alert('Saved')
  }
  const handleCancelDraft = (e) => {
    e.preventDefault()
    alert('Cancelled')
  }
  const handleClickSubmit = (e) => {
    e.preventDefault()
    setIsWaitingVal(true)
    setTimeout(() => {
      e.target.form.requestSubmit()
    }, 2000)
  }

  // START
  // check w/
  // u=http://localhost:8000/v1/certificate ; len=$(curl -s $u | jq length) ; curl -s $u | jq .[$((r - 1))]
  const handleClick = () => {
    setLoading(true)
    const url = 'http://localhost:8000/v1/certificate'
    const bodyObj = {
      energy_consumed_wh: 2000000,
      production_start_time: '2024-01-25T10:00:00.000Z',
      production_end_time: '2024-01-25T20:00:00.000Z',
      regulator: 'Reginald',
      energy_owner: 'Emma',
      hydrogen_quantity_wh: 2000000,
    }
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyObj),
    })
      .then((r) => r.json())
      .then((data) => setData(data))
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
      .finally(() => setLoading(false))
  }
  // END

  return (
    <Sidebar area="sidebar">
      <PaddedDiv>
        <Grid
          areas={[
            ['div-left', 'div-right'],
            ['div-double', 'div-double'],
          ]}
          rows={['40px', '60px']}
          columns={['1fr', '1fr']}
          gap="20px 10px"
        >
          <Grid.Panel area="div-left">
            <SmallButton
              variant="roundedPronounced"
              onClick={handleClickSaveDraft}
            >
              Save draft
            </SmallButton>
          </Grid.Panel>
          <Grid.Panel area="div-right">
            <SmallButton
              variant="roundedPronounced"
              onClick={handleCancelDraft}
            >
              Cancel
            </SmallButton>
          </Grid.Panel>
          <Grid.Panel area="div-double">
            <LargeButton
              variant="roundedPronounced"
              onClick={handleClickSubmit}
            >
              Submit
              {isWaitingVal && <span>...</span>}
            </LargeButton>
            <br />
            <hr />
            <button type="button" onClick={handleClick}>
              {loading == false && data == null && <span>Submit</span>}
              {loading == false && data != null && <span>Submitted</span>}
              {loading && <span>...</span>}
            </button>
            {error && <div>ERROR: {JSON.stringify(error)}</div>}
            {data && <div>{JSON.stringify(data)}</div>}
          </Grid.Panel>
        </Grid>
      </PaddedDiv>
    </Sidebar>
  )
}

const Sidebar = styled(Grid.Panel)`
  align-items: center;
  justify-items: center;
  min-width: 340px;
  color: white;
  background: #0c3b38;
`

const PaddedDiv = styled.div`
  padding: 34px 21px;
  width: 100%;
`

const SmallButton = styled(Button)`
  width: 100%;
  min-width: 132px;
  height: 100% !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;

  font-size: 15.5px;

  color: #ffffff;
  border: 1px solid #ffffff !important;
  background: #124338 !important;

  &:hover {
    opacity: 0.6;
  }
`

const LargeButton = styled(SmallButton)`
  font-size: 21px;

  color: #33e58c;
  border: 1px solid #2fe181 !important;
  background: #124338 !important;
`
