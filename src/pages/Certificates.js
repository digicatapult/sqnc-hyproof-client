import React from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Context } from '../utils/Context'
import { timelineProps } from '../assets/copy/timeline-props'


export default function Certificates() {
  const { current, update, ...rest } = React.useContext(Context)
  const persona = rest[current] || null
  console.log({ current, persona })

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <CertificateForm variant="hyproof" {...timelineProps} />
    </>
  )
}
