import React from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Context } from '../utils/Context'
import { timelineProps } from '../assets/copy/timeline-props'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Certificates() {
  const { current, update, ...personas } = React.useContext(Context)
  const [persona] = React.useState(personas[current])

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <QueryClientProvider client={queryClient}>
        <CertificateForm
          variant="hyproof"
          origin={persona.origin}
          {...timelineProps}
        />
      </QueryClientProvider>
    </>
  )
}
