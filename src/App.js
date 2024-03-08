import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routes from './utils/Router'

import { Grid, SidePanel } from '@digicatapult/ui-component-library'

import { Context } from './utils/Context'

export const personas = [
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
    id: 'emma',
    name: 'Emma Emma',
    title: 'Emma Emma',
    subtitle: 'The Energy Producer',
    company: "Emma's Energy LTD",
    background: '#AAED93',
    origin: 'http://localhost:8010',
  },
  {
    id: 'reginald',
    name: 'Reginald Reginald',
    title: 'Reginald Reginald',
    subtitle: 'The Regulator',
    background: '#FCF281',
    origin: 'http://localhost:8020',
  },
  {
    id: 'connor',
    name: 'Connor Connor',
    title: 'Connor Connor',
    subtitle: 'The Hydrogen Consumer',
    background: '#FDB6D4',
    origin: 'http://localhost:8020',
  },
]

export default function App() {
  const {
    update,
    current,
    currentId,
    currentCommitment,
    currentCommitmentSalt,
    currentEnergyConsumedWh,
    currentProductionStartTime,
    currentProductionEndTime,
  } = useContext(Context)

  const [showSelector, setShowSelector] = useState(false)
  const persona = personas.find(({ id }) => id === current)

  const handlePersonaSwitch = (persona) => {
    if (current !== persona.id) {
      return update({
        current: persona.id,
        currentId,
        currentCommitment,
        currentCommitmentSalt,
        currentEnergyConsumedWh,
        currentProductionStartTime,
        currentProductionEndTime,
      })
    }
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
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
            active={el.id === current}
            update={(_, persona) => handlePersonaSwitch(persona)}
            variant="hyproof"
          />
        ))}
      </SidePanel>
      <FullScreenGrid
        color={persona.background}
        showSelector={showSelector}
        areas={[
          ['home', 'nav'],
          ['header', 'header'],
          ['timeline', 'main'],
          ['timeline', 'sidebar'],
        ]}
        columns={['minmax(min-content, 1fr)', '2fr']}
        rows={['78px', '98px', '1fr', 'auto']}
        byWidth={[
          {
            minWidth: 1000,
            areas: [
              ['home', 'nav', 'nav'],
              ['header', 'header', 'sidebar'],
              ['timeline', 'main', 'sidebar'],
            ],
            columns: [
              'minmax(min-content, 1.5fr)',
              '4fr',
              'minmax(min-content, 1.5fr)',
            ],
            rows: ['78px', '98px', '1fr'],
          },
          {
            minWidth: 1500,
            areas: [
              ['home', 'nav', 'nav'],
              ['header', 'header', 'sidebar'],
              ['timeline', 'main', 'sidebar'],
            ],
            columns: ['320px', '1fr', '320px'],
            rows: ['78px', '98px', '1fr'],
          },
        ]}
      >
        <Routes />
      </FullScreenGrid>
    </QueryClientProvider>
  )
}

const FullScreenGrid = styled(Grid)`
  height: 100lvh;
  width: ${({ showSelector }) =>
    showSelector ? 'calc(100lvw - 450x)' : '100lvw'};
  margin-left: ${({ showSelector }) => (showSelector ? '450px' : '0px')};
  overflow: hidden;
  box-sizing: border-box;
  transition:
    width ease-in-out 0.7s,
    border ease-in-out 0.7s,
    margin-left ease-in-out 0.7s;
  border: ${({ showSelector, color }) =>
    `${showSelector ? '20px' : '0px'} solid ${color}`};
`
