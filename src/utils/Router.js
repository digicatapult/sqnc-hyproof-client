import React from 'react'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router-dom'

import Certificates from '../pages/Certificates'
import CertificatesViewAll from '../pages/CertificatesViewAll'
import CertificateNotProvided from '../pages/CertificateNotProvided'
import CertificateViewer from '../pages/CertificateViewer'
import CertificateCo2Embedder from '../pages/CertificateCo2Embedder'
import Error404 from '../pages/Error404'

export default function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {/* The below should be renamed to CertificateCreator / Initiator */}
            <Route path="/" element={<Certificates />} />
            <Route path="/certificates" element={<CertificatesViewAll />} />
            <Route path="/certificate" element={<Outlet />}>
              <Route index element={<CertificateNotProvided />} />
              <Route path=":id" element={<Outlet />}>
                <Route index element={<CertificateViewer />} />
                <Route path="embed" element={<CertificateCo2Embedder />} />
              </Route>
            </Route>
            <Route path="*" element={<Error404 />} />
          </>
        )
      )}
    />
  )
}
