import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import Nav from './components/Nav'
import Header from './components/Header'
import CertificateForm from './components/CertificateForm'
import { Context } from '../utils/Context'
import { personas } from '../App'
import useAxios from '../hooks/use-axios'
import { Spinner } from '@digicatapult/ui-component-library'


export default function Certificates() {
  const { current, update } = useContext(Context)
  const { loading, error, fetch } = useAxios(false)
  const { id } = useParams()

  const persona = personas.find(({ id }) => id === current)

  React.useEffect(() => {
    const get = async () => {
      const url = `http://localhost:3001/v1/certificate?id=${id}`
      const data = await fetch({ url })

      console.log(data, ' asdas d')
      update(data, current) // drop in all res for time being so we have all properties
    }

    get() 
  }, [])

  console.log({ error, persona })

  return (
    <>
      <Nav />
      <Header userFullName={persona.name} companyName={persona.company} />
      {loading ?
        <Spinner variant={'hyproof'} /> : 
        <CertificateForm />}
    </>
  )
}
