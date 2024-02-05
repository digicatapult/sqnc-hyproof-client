import React from 'react'
import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'
import { Grid, SidePanel } from '@digicatapult/ui-component-library'
import { Context } from './utils/Context'
import Personas from './assets/copy/personas-details.js'

const FullScreenGrid = styled(Grid)`
  height: 100lvh;
  width: 100lvw;
  transition-delay: 0.3s;
  overflow: hidden;
  box-sizing: content-box;
  transition-property: margin-left border;
  margin-left: ${({ showSelector }) => (showSelector ? '400px' : '0px')};
  border: ${({ showSelector, color }) =>
    showSelector ? '20px solid ' + color : 'none'};
`

export default function App() {
  const [showSelector, setShowSelector] = React.useState(false)
  const { update, current } = React.useContext(Context)

  const persona = Personas.find(({ id }) => id === current)

  const handlePersonaSwitch = (persona) => {
    if (current != persona) {
      return update({ current: persona.id })
    }
  }

  return (
    <FullScreenGrid
      color={persona.background}
      showSelector={showSelector}
      areas={[
        ['home', 'nav', 'nav'],
        ['header', 'header', 'sidebar'],
        ['timeline', 'main', 'sidebar'],
      ]}
      columns={['auto', '1fr', 'auto']}
      rows={['78px', '98px', '1fr']}
    >
      <SidePanel
        width={350}
        variant="hyproof"
        heading="Certificate View"
        title={persona.name}
        callback={(e) => setShowSelector(e.isOpen)}
      >
        {Personas.map((persona) => (
          <SidePanel.Item
            key={persona.id} 
            {...persona}
            update={() => {
              handlePersonaSwitch(persona)
            }}
            variant="hyproof"
          />
        ))}
      </SidePanel>
      <RouterProvider router={router} />
    </FullScreenGrid>
  )
}
