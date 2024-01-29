import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Grid, Button } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons({ data, error, loading }) {
  const handleClickSaveDraft = (e) => {
    e.preventDefault()
    alert('Saved')
  }
  const handleCancelDraft = (e) => {
    e.preventDefault()
    alert('Cancelled')
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
            <LargeButton disabled={loading} variant="roundedPronounced">
              {loading == false && data == null && <Span>Submit</Span>}
              {loading == false && data != null && <Span>Submitted</Span>}
              {loading && <AnimatedSpan>...</AnimatedSpan>}
              {error && <Span>Error</Span>}
            </LargeButton>

            {data && (
              <div style={{ width: '266px', fontSize: '9px' }}>
                <br />
                <hr />
                {JSON.stringify(data, null, 2)}
              </div>
            )}
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

const RevealAnimation = keyframes`
  from {
    width: 0px;
  }
  to {
    width: 22px;
  }
`

const AnimatedSpan = styled.span`
  overflow: hidden;
  display: inline-flex;
  white-space: nowrap;
  margin: 0 auto;
  animation: ${RevealAnimation} 1s steps(4, end) infinite;
`

const Span = styled.span``
