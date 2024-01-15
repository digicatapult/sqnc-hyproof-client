import React from 'react'
import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'
import { Grid } from '@digicatapult/ui-component-library'

const FullScreenGrid = styled(Grid)`
  height: 100lvh;
  width: 100lvw;
`

export default function App() {
  return (
    <FullScreenGrid
      areas={[
        ['home', 'nav', 'nav'],
        ['header', 'header', 'sidebar'],
        ['timeline', 'main', 'sidebar'],
      ]}
      columns={['auto', '1fr', 'auto']}
      rows={['82px', '82px', '1fr']}
    >
      <RouterProvider router={router} />
    </FullScreenGrid>
  )
}
