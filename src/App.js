import React from 'react'
import styled from 'styled-components'
// import { RouterProvider } from 'react-router-dom'

// import { router } from './utils/Router'
import { Grid, SidePanel } from '@digicatapult/ui-component-library'
import { Context } from './utils/Context'

import Certificates from './pages/Certificates'

export const personas = [
  {
    id: 'connor',
    name: 'Connor Connor',
    title: 'Connor Connor',
    subtitle: 'The Hydrogen Consumer',
    background: '#FDB6D4',
    origin: 'http://localhost:8030',
  },
  {
    id: 'emma',
    name: 'Emma Emma',
    title: 'Emma Emma',
    subtitle: 'The Energy Producer',
    company: "Emma's Energy LTD",
    background: '#AAED93',
    origin: 'http://localhost:8010',
  },
  {
    id: 'heidi',
    name: 'Heidi Heidi',
    title: 'Heidi Heidi',
    subtitle: 'The Hydrogen Producer',
    company: "Heidi's Hydroelectric Hydrogen",
    background: '#9EDCFA',
    origin: 'http://localhost:8000',
  },
  {
    id: 'reginald',
    name: 'Reginald Reginald',
    title: 'Reginald Reginald',
    subtitle: 'The Regulator',
    background: '#FCF281',
    origin: 'http://localhost:8020',
  },
]

export default function App() {
  const { update, current } = React.useContext(Context)
  const { currentId } = React.useContext(Context)

  const [showSelector, setShowSelector] = React.useState(false)
  const persona = personas.find(({ id }) => id === current)

  const handlePersonaSwitch = (persona) => {
    if (current !== persona.id) {
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
        {personas.map((el) => (
          <SidePanel.Item
            {...el}
            key={el.id}
            update={(_, persona) => handlePersonaSwitch(persona)}
            variant="hyproof"
          />
        ))}
      </SidePanel>
      <Certificates />
      {currentId == '' && <>||</>}
      {currentId != '' && <code>&nbsp;current local cert id:{currentId}</code>}
      {/* <RouterProvider router={router} /> */}
    </FullScreenGrid>
  )
}

const FullScreenGrid = styled(Grid)`
  height: 100lvh;
  width: ${({ showSelector }) =>
    showSelector ? 'calc(100lvw - 450x)' : '100lvw'};
  margin-left: ${({ showSelector }) => (showSelector ? '450px' : '0px')};
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${({ showSelector, color }) =>
    showSelector ? color : 'white'};
  transition:
    background-color ease 0.1s,
    width ease-in-out 0.7s,
    padding ease-in-out 0.7s,
    margin-left ease-in-out 0.7s;
  padding: ${({ showSelector }) => (showSelector ? '20px' : '0px')};
`
