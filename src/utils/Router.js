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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Certificates from '../pages/Certificates'
import CertificatesViewAll from '../pages/CertificatesViewAll'
import CertificateManager from '../pages/components/CertificateManager'
import Error404 from '../pages/Error404'

const CreateViewSwitcher = () => {
  const create = useSearchParams()[0].get('create')
  return create ? (
    <QueryClientProvider client={new QueryClient()}>
      <Certificates />
    </QueryClientProvider>
  ) : (
    <CertificatesViewAll />
  )
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
              <Route
                path=":id"
                element={
                  <QueryClientProvider client={new QueryClient()}>
                    <CertificateManager />
                  </QueryClientProvider>
                }
              />
            </Route>
            <Route path="*" element={<Error404 />} />
          </>
        )
      )}
    />
  )
}
