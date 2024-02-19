import React, { useContext } from 'react'

import { Context } from '../../utils/Context'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CertificateViewPostSwitcher from './CertificateViewPostSwitcher'

export default function CertificateManager() {
  const { current } = useContext(Context)
  return (
    <>
      {current != 'emma' ? (
        <>CertificateViewer(Switch2Emma)</>
      ) : (
        <QueryClientProvider client={new QueryClient()}>
          <CertificateViewPostSwitcher />
        </QueryClientProvider>
      )}
    </>
  )
}
