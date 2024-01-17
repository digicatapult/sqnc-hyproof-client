import React from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'

export default function Certificates() {
  const userName = 'Heidi Heidi'
  const companyName = "Heidi's Hydroelectric Hydrogen"
  return (
    <>
      <Nav />
      <Header userFullName={userName} companyName={companyName} />
      <CertificateForm />
    </>
  )
}
