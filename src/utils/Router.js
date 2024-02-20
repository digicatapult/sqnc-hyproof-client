import React from 'react'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router-dom'

import Certificates from '../pages/Certificates'


export default function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/" element={<Certificates />} />
            <Route path="/certificate" element={<Outlet />}>
              <Route path=":id" element={'not implemented'} />
            </Route>
            <Route path="*" element={'page not found'} />
          </>
        )
      )}
    />
  )
}
