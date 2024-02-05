import React from 'react'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Grid, SidePanel } from '@digicatapult/ui-component-library'
import { Context } from '../utils/Context'
import { timelineProps } from '../assets/copy/timeline-props'

export default function Certificates() {
  const { current, update, ...personas } = React.useContext(Context)
  const [persona] = React.useState(personas[current])

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      <CertificateForm variant="hyproof" {...timelineProps} />
    </>
  )
}
