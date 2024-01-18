import React from 'react'
import styled from 'styled-components'

import { Grid, Button } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons() {
  function handleClickSaveDraft() {
    alert('Saved')
  }
  function handleCancelDraft() {
    alert('Cancelled')
  }
  function handleClickSubmit(e) {
    e.preventDefault()
    e.target.form.requestSubmit()
  }

  return (
    <>
      <Sidebar area="sidebar">
        <PaddedDiv>
          <Grid
            style={{ gridTemplateRows: '40px 60px' }}
            areas={[
              ['div-left', 'div-right'],
              ['div-double', 'div-double'],
            ]}
            rows={['1fr', '1fr']}
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
              </LargeButton>
            </Grid.Panel>
          </Grid>
        </PaddedDiv>
      </Sidebar>
    </>
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

  font-size: 15.5px;

  color: #ffffff;
  border: 1px solid #ffffff !important;
  background: #124338 !important;
`

const LargeButton = styled(SmallButton)`
  font-size: 21px;

  color: #33e58c;
  border: 1px solid #2fe181 !important;
  background: #124338 !important;
`
