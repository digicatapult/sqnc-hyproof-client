import React from 'react'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
  useSearchParams,
} from 'react-router-dom'

import Certificates from '../pages/Certificates'
import CertificatesViewAll from '../pages/CertificatesViewAll'
import CertificateViewer from '../pages/CertificateViewer'

const CreateViewSwitcher = () => {
  const create = useSearchParams()[0].get('create')
  return create ? <Certificates /> : <CertificatesViewAll />
}

export default function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {/* TODO: Certificates should be renamed to CertificateCreator / Initiator */}
            <Route path="/" element={<Navigate to="/certificate?create=y" />} />
            <Route path="/certificate" element={<Outlet />}>
              <Route index element={<CreateViewSwitcher />} />
              <Route path=":id" element={<CertificateViewer />} />
            </Route>
            <Route path="/certificates" element={<CertificatesViewAll />} />
          </>
        )
      )}
    />
  )
}
