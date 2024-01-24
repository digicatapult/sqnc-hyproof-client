import React from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'

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

export default function Certificates() {
  const userName = 'Heidi Heidi'
  const companyName = "Heidi's Hydroelectric Hydrogen"
  return (
    <>
      <Nav />
      <Header userFullName={userName} companyName={companyName} />
      <CertificateForm variant="hyproof" {...timelineProps} />
    </>
  )
}
