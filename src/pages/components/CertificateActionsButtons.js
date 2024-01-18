import React from 'react'
import styled from 'styled-components'

import { Grid, Button } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons({ onSubmit }) {
  return (
    <>
      <Sidebar area="sidebar">
        <PaddedDiv>
          <Grid
            style={{ backgroundColor: 'white' }}
            areas={[
              ['div-left', 'div-right'],
              ['div-double', 'div-double'],
            ]}
            rows={['1fr', '1fr']}
            columns={['1fr', '1fr']}
            gap="20px 10px"
          >
            <Grid.Panel area="div-left">
              <Div>left</Div>
            </Grid.Panel>
            <Grid.Panel area="div-right">
              <Div>right</Div>
            </Grid.Panel>
            <Grid.Panel area="div-double">
              <Div>
                <Button onSubmit={onSubmit} variant="rounded">
                  Submit
                </Button>
              </Div>
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

const Div = styled.div`
  min-width: 132px;

  padding: 1em;
  background-color: #369a93;
  color: #454545;
`
