import React from 'react'
import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'
// import Header from './components/Header'
import { Grid } from '@digicatapult/ui-component-library'

const FullScreenGrid = styled(Grid)`
  height: 100vh;
  width: 100vw;
`

export default function App() {
  // const location = window.location.pathname

  return (
    <FullScreenGrid
      areas={[['header'], ['main']]}
      columns={['1fr']}
      rows={['82px', '1fr']}
    >
      {/* <Header location={window.location.pathname} /> */}
      <RouterProvider router={router} />
    </FullScreenGrid>
  )
}
