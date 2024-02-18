/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom'

import { Context } from '../utils/Context'

// import CertificateManager from '../pages/components/Certificate'
import CertificateManager from '../pages/components/CertificateManager'

// import Error404 from '../pages/Error404'
import Certificates from '../pages/Certificates'
import CertificatesViewAll from '../pages/CertificatesViewAll'
import CertificateNotProvided from '../pages/CertificateNotProvided'
import CertificateViewer from '../pages/CertificateViewer'
import CertificateCo2Embedder from '../pages/CertificateCo2Embedder'

const CertificateViewerOrCreator = () => {
  const create = useSearchParams()[0].get('create')
  return create ? <Certificates /> : <CertificatesViewAll />
}

// const CertificateManager = () => {
//   const { current } = useContext(Context)
//   return <>{current != 'emma' ? <>CertificateViewer</> : <>Check_hasCo2</>}</>
// }

const Error404 = () => <>Error404</>

export default function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {/* TODO: Certificates should be renamed to CertificateCreator / Initiator */}
            <Route path="/" element={<Navigate to="/certificate?create=y" />} />
            <Route path="/certificate" element={<Outlet />}>
              <Route index element={<CertificateViewerOrCreator />} />
              <Route path=":id" element={<CertificateManager />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </>
        )
      )}
    />
  )
}
