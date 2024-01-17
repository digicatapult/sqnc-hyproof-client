import React from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons({ onSubmit }) {
  return (
    <>
      <Sidebar area="sidebar">
        <PaddedDiv>
          <GriddedDiv>
            <Div>SaveDraft</Div>
            <Div>Cancel</Div>
            <DivDouble>
              <button onSubmit={onSubmit}>Submit</button>
            </DivDouble>
          </GriddedDiv>
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

const GriddedDiv = styled.div`
  display: grid;
  gap: 20px 10px;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 44px 69px;

  background-color: #25928b;
`

const Div = styled.div`
  min-width: 132px;

  padding: 1em;
  background-color: #369a93;
  color: #454545;
`

const DivDouble = styled(Div)`
  grid-column: 1 / -1;
`

// const BoxDoubleAlternative = styled(Box)`
//   grid-column-start: 1;
//   grid-column-end: 3;
// `
