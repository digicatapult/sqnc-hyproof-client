import React, { useContext } from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Context } from '../utils/Context'
import { personas } from '../App'

export default function Certificates() {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  const { name, company, background } = persona

  return (
    <>
      <Nav />
      <Header userFullName={name} companyName={company} bg={background} />
      <CertificateForm variant="hyproof" />
    </>
  )
}
