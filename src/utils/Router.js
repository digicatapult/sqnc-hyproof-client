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

import CertificateCreator from '../pages/CertificateCreator'
import CertificatesViewAll from '../pages/CertificatesViewAll'
import CertificateManager from '../pages/components/CertificateManager'
import Error404 from '../pages/Error404'

const CreateViewSwitcher = () => {
  const create = useSearchParams()[0].get('create')
  return create ? <CertificateCreator /> : <CertificatesViewAll />
}

export default function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/" element={<Navigate to="/certificate?create=y" />} />
            <Route path="/certificate" element={<Outlet />}>
              <Route index element={<CreateViewSwitcher />} />
              <Route path=":id" element={<CertificateManager />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </>
        )
      )}
    />
  )
}
