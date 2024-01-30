import React from 'react'
import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'
import { Grid } from '@digicatapult/ui-component-library'
import { Context } from './utils/Context'

const colorMap = {
  emma: '#AAED93',
  heidi: '#FDB6D4',
  reginald: '#FCF281',
}

const FullScreenGrid = styled(Grid)`
  height: 100lvh;
  width: 100lvw;
  overflow: hidden;
  border: ${({ showSelector, color }) =>
    showSelector ? '20px solid ' + color : 'none'};
`

export default function App() {
  const { update, current, showSelector } = React.useContext(Context)
  const color = colorMap[current] || 'none'

  const handlePersonaSwitch = (persona) => {
    if (current != persona) {
      return update({ current: persona })
    }
  }

  handlePersonaSwitch('emma')

  return (
    <FullScreenGrid
      color={color}
      showSelector={showSelector}
      areas={[
        ['home', 'nav', 'nav'],
        ['header', 'header', 'sidebar'],
        ['timeline', 'main', 'sidebar'],
      ]}
      columns={['auto', '1fr', 'auto']}
      rows={['78px', '98px', '1fr']}
    >
      <RouterProvider router={router} />
    </FullScreenGrid>
  )
}
