import React from 'react'
import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'
import { Grid, SidePanel } from '@digicatapult/ui-component-library'
import { Context } from './utils/Context'

export const personas = [
  {
    id: 'conor',
    name: 'Conor Conor',
    title: 'Conor Conor',
    subtitle: 'The Hydrogen Consumer',
    background: '#FDB6D4',
  },
  {
    id: 'emma',
    name: 'Emma Emma',
    title: 'Emma Emma',
    subtitle: 'The Energy Producer',
    background: '#AAED93',
  },
  {
    id: 'heidi',
    name: 'Heidi Heidi',
    title: 'Heidi Heidi',
    subtitle: 'The Hydrogen Producer',
    company: "Heidi's Hydroelectric Hydrogen",
    // background: '#FDB6D4',
    background: '#9EDCFA',
  },
  {
    id: 'reginald',
    name: 'Reginald Reginald',
    title: 'Reginald Reginald',
    subtitle: 'The Regulator',
    background: '#FCF281',
  },
]

const FullScreenGrid = styled(Grid)`
  height: 100lvh;
  width: ${({ showSelector }) =>
    showSelector ? 'calc(100lvw - 430px)' : '100lvw'};
  margin-left: ${({ showSelector }) => (showSelector ? '430px' : '0px')};
  overflow: hidden;
  box-sizing: border-box;
  transition:
    width ease-in-out 0.7s,
    margin-left ease-in-out 0.7s;
  border: ${({ showSelector, color }) =>
    showSelector ? '20px solid ' + color : 'none'};
`

export default function App() {
  const [showSelector, setShowSelector] = React.useState(false)
  const { update, current } = React.useContext(Context)

  const persona = personas.find(({ id }) => id === current)

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
        width={400}
        variant="hyproof"
        heading="Certificate View"
        title={persona.name}
        callback={(e) => setShowSelector(e.isOpen)}
      >
        {personas.map((persona) => (
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
