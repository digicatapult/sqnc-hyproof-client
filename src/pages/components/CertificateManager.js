import React from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CertificateViewer from '../CertificateViewer'

export default function CertificateManager() {
  return (
    <>
      {/* <QueryClientProvider client={new QueryClient()}> */}
      <CertificateViewer />
      {/* </QueryClientProvider> */}
    </>
  )
}
