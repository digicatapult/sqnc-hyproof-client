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
    id: 'connor',
    name: 'Connor Connor',
    title: 'Connor Connor',
    subtitle: 'The Hydrogen Consumer',
    company: "Conor's Consuming LTD",
    background: '#FDB6D4',
    origin: 'http://localhost:8020',
  },
  {
    id: 'reginald',
    name: 'Reginald Reginald',
    title: 'Reginald Reginald',
    subtitle: 'The Regulator',
    company: "Reginald's Hydrogen Regulator",
    background: '#FCF281',
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
        rows={['auto', 'auto', '1fr', 'auto']}
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
            rows: ['auto', 'auto', '1fr'],
          },
          {
            minWidth: 1500,
            areas: [
              ['home', 'nav', 'nav'],
              ['header', 'header', 'sidebar'],
              ['timeline', 'main', 'sidebar'],
            ],
            columns: ['320px', '1fr', '320px'],
            rows: ['auto', 'auto', '1fr'],
          },
        ]}
      >
        <SidePanel
          width="400px"
          variant="hyproof"
          heading="Certificate View"
          title={persona.name}
          isOpen={false}
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
        <Routes />
      </FullScreenGrid>
    </QueryClientProvider>
  )
}

const FullScreenGrid = styled(Grid)`
  min-height: 100lvh;
  padding: ${({ showSelector }) =>
    showSelector ? '20px 20px 20px min(10lvw, 400px)' : '0px'};
  overflow: hidden;
  box-sizing: border-box;
  transition: padding ease-in-out 0.7s;

  isolation: isolate;
  & > *:first-child {
    z-index: 1;
  }
  & > *:not(:first-child) {
    z-index: -1;
  }
  &::before {
    content: '';
    position: fixed;
    z-index: -3;
    inset: 0px;
    background: ${({ color }) => color || 'white'};
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -2;
    inset: ${({ showSelector }) =>
      showSelector ? '20px 20px 20px min(10lvw, 400px)' : '0px'};
    transition: inset ease-in-out 0.7s;
    background: white;
  }
`
