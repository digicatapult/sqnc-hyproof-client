import React from 'react'
import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'
import { Grid } from '@digicatapult/ui-component-library'

const FullScreenGrid = styled(Grid)`
  height: 100vh;
  width: 100vw;
`

export default function App() {
  return (
    <FullScreenGrid
      areas={[['header'], ['main']]}
      columns={['1fr']}
      rows={['82px', '1fr']}
    >
      <RouterProvider router={router} />
    </FullScreenGrid>
  )
}
