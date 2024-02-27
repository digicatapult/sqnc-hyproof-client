import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Context } from '../../utils/Context'
import { personas } from '../../App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAxios from '../../hooks/use-axios'

import CertificateViewer from '../CertificateViewer'
import CertificateCo2Post from './CertificateCo2Post'

const CertificateViewPostSwitcher = () => {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)

  const { loading, error, callApiFn } = useAxios(false)
  const [isCo2Checked, setIsCo2Checked] = useState(false)
  const [hasCo2, setHasCo2] = useState(false)
  const [queriedCert, setQueriedCert] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const callApiFnAsync = async () => {
      const origin = persona.origin
      const originalId = id
      const path = `/v1/certificate/${originalId}`
      const url = `${origin}${path}`
      let res = null
      try {
        res = await callApiFn({ url })
      } catch (e) {
        alert(e)
      }
      const embodiedCo2 = res?.embodied_co2 != null && res?.embodied_co2 >= 0
      setQueriedCert(res)
      setHasCo2(embodiedCo2)
      setIsCo2Checked(true)
    }
    callApiFnAsync()
  }, [id, persona.origin, callApiFn])

  if (loading) return <p>Loading...</p>
  if (error) return <em>{JSON.stringify(error?.message)}</em>
  return (
    <>
      <div style={{ display: 'none' }}>{JSON.stringify(queriedCert || {})}</div>
      {isCo2Checked == true ? (
        <>{hasCo2 == true ? <CertificateViewer /> : <CertificateCo2Post />}</>
      ) : (
        <p>{'Loading...'}</p>
      )}
    </>
  )
}

export default function CertificateManager() {
  const { current } = useContext(Context)
  return (
    <>
      {current != 'emma' ? (
        <QueryClientProvider client={new QueryClient()}>
          <CertificateViewer />
        </QueryClientProvider>
      ) : (
        <QueryClientProvider client={new QueryClient()}>
          <CertificateViewPostSwitcher />
        </QueryClientProvider>
      )}
    </>
  )
}
