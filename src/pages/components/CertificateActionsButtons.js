import React from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

export default function CertificateActionsButtons({ onSubmit }) {
  return (
    <Sidebar area="sidebar">
      <button onSubmit={onSubmit}>Submit</button>
    </Sidebar>
  )
}

const Sidebar = styled(Grid.Panel)`
  display: grid;
  align-items: center;
  justify-items: center;
  min-width: 400px;
  color: white;
  background: #0c3b38;
`
