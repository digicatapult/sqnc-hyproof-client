import React, { useState } from 'react'
import styled from 'styled-components'

import { Grid, Button } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons() {
  const [isWaitingVal, setIsWaitingVal] = useState(false)

  const handleClickSaveDraft = () => alert('Saved')
  const handleCancelDraft = () => alert('Cancelled')
  const handleClickSubmit = (e) => {
    e.preventDefault()
    setIsWaitingVal(true)
    setTimeout(() => {
      e.target.form.requestSubmit()
    }, 2000)
  }

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
