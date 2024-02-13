// import { createBrowserRouter } from 'react-router-dom'
//
// import Certificates from '../pages/Certificates'
//
// export const router = createBrowserRouter([
//   { path: '/', Component: Certificates },
//   { path: '/certificates', Component: Certificates },
// ])

import React from 'react'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  useParams,
} from 'react-router-dom'

import { Context } from './Context'

import Certificates from '../pages/Certificates'

function Certificate() {
  let { id } = useParams()
  return (
    <>
      <h3>CertIndex: {id}</h3>
    </>
  )
}

function CertificateCo2Embedder() {
  let { id } = useParams()

  const {
    current,
    currentId,
    currentCommitmentSalt,
    currentEnergyConsumedWh,
    currentProductionStartTime,
    currentProductionEndTime,
  } = React.useContext(Context)

  return (
    <>
      <h3>Cert Embed Id: {id}</h3>
      <hr />
      {current == 'heidi' && <>Switch2Emma</>}
      {current == 'emma' && (
        <code>
          cur id: {currentId} <br />
          currentCommitmentSalt: {currentCommitmentSalt} <br />
          currentEnergyConsumedWh: {currentEnergyConsumedWh} <br />
          currentProductionStartTime: {currentProductionStartTime} <br />
          currentProductionEndTime: {currentProductionEndTime} <br />
          TODO: embed the co2 data w/ <br />
          GET /v1/certificate ( get the latest that matches the above ) <br />
          POST v1/certificate/$emma_local_id <br />
          POST v1/certificate/$emma_local_id/issuance
        </code>
      )}
    </>
  )
}

export default function Routes() {
  return (
    <RouterProvider
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
    />
  )
}
