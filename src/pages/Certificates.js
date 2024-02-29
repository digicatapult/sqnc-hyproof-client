import React, { useContext } from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Context } from '../utils/Context'
import { personas } from '../App'

export default function Certificates() {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <CertificateForm variant="hyproof" />
    </>
  )
}
