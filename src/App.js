import React from 'react'
import styled from 'styled-components'

// import { RouterProvider } from 'react-router-dom'
// import { router } from './utils/Router'
// import {
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   Outlet,
//   useParams,
// } from 'react-router-dom'

import { Grid, SidePanel } from '@digicatapult/ui-component-library'
import { Context } from './utils/Context'

// import Certificates from './pages/Certificates'

import Routes from './utils/Router'

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

// function Certificate() {
//   let { id } = useParams()
//   return (
//     <>
//       <h3>CertIndex: {id}</h3>
//     </>
//   )
// }

// function CertificateCo2Embedder() {
//   let { id } = useParams()
//
//   const {
//     current,
//     currentId,
//     currentCommitmentSalt,
//     currentEnergyConsumedWh,
//     currentProductionStartTime,
//     currentProductionEndTime,
//   } = React.useContext(Context)
//
//   return (
//     <>
//       <h3>Cert Embed Id: {id}</h3>
//       <hr />
//       {current == 'heidi' && <>Switch2Emma</>}
//       {current == 'emma' && (
//         <code>
//           cur id: {currentId} <br />
//           currentCommitmentSalt: {currentCommitmentSalt} <br />
//           currentEnergyConsumedWh: {currentEnergyConsumedWh} <br />
//           currentProductionStartTime: {currentProductionStartTime} <br />
//           currentProductionEndTime: {currentProductionEndTime} <br />
//           TODO: embed the co2 data w/ <br />
//           GET /v1/certificate ( get the latest that matches the above ) <br />
//           POST v1/certificate/$emma_local_id <br />
//           POST v1/certificate/$emma_local_id/issuance
//         </code>
//       )}
//     </>
//   )
// }

export default function App() {
  const {
    update,
    current,
    currentId,
    currentCommitmentSalt,
    currentEnergyConsumedWh,
    currentProductionStartTime,
    currentProductionEndTime,
  } = React.useContext(Context)

  const [showSelector, setShowSelector] = React.useState(false)
  const persona = personas.find(({ id }) => id === current)

  const handlePersonaSwitch = (persona) => {
    if (current !== persona.id) {
      return update({
        current: persona.id,
        currentId,
        currentCommitmentSalt,
        currentEnergyConsumedWh,
        currentProductionStartTime,
        currentProductionEndTime,
      })
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
      {/* <Certificates /> */}
      {/* {currentId == '' && <></>} */}
      {/* {(currentId != '' || currentCommitmentSalt != '') && ( */}
      {/* <>{currentCommitmentSalt}</> */}
      {/* )} */}
      {/* <RouterProvider router={router} /> */}
      {/* <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Certificates />} />
                <Route path="certificate" element={<Outlet />}>
                  <Route index element={<h2>CertificateIndex</h2>} />
                  <Route path=":id" element={<Outlet />}>
                    <Route index element={<Certificate />} />
                    <Route path="embed" element={<CertificateCo2Embedder />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<>404</>} />
            </>
          )
        )}
      /> */}
      {/* <BrowserRouter /> */}
      <Routes />
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
