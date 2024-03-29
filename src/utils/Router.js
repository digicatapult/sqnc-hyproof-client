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
import Error404 from '../pages/Error404'

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
            <Route path="/" element={<Navigate to="/certificate" />} />
            <Route path="/certificate" element={<Outlet />}>
              <Route index element={<CreateViewSwitcher />} />
              <Route path=":id" element={<CertificateViewer />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </>
        )
      )}
    />
  )
}
