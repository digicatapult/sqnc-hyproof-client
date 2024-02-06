import React from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Context } from '../utils/Context'
import { personas } from '../App'

const timelineProps = {
  name: 'UK-HYPROOF-0001',
  disclaimer:
    'Your certification status is dynamic and may change  over time. Always refer to this page for the most up-to-date status.',
  items: [
    {
      title: 'Initiation',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
      checked: true,
      status: 'in progress',
    },
    {
      title: 'Carbon Embodiment',
      status: 'pending',
    },
    {
      title: 'Issuance',
      status: 'pending',
    },
  ],
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Certificates() {
  const { current } = React.useContext(Context)
  const persona = personas.find(({ id }) => id === current)

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
