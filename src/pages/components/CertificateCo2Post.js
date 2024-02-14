import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Context } from '../../utils/Context'
import { personas } from '../../App'

import useAxios from '../../hooks/use-axios'

export default function CertificateCo2Post({ hash, salt, energy, start, end }) {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  const origin = persona.origin
  const path = '/v1/certificate'
  const u = `${origin}${path}`
  const { data: all, error: errorAll, loading: loadingAll } = useAxios(true, u)

  const [certVanilla, setCertVanilla] = useState(null)

  const [loading, setLoading] = useState(false)
  const [errorCompute, setComputeError] = useState('')

  const handleSubmitStep = useCallback(async () => {
    setLoading(true)
    alert(Math.random())
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!all) return
    const certFound = all.find(({ commitment }) => commitment === hash)
    if (certFound == undefined) {
      setComputeError('ErrorNoCertWithGivenHash')
      return
    }
    setCertVanilla(certFound)
    handleSubmitStep()
  }, [all, hash, handleSubmitStep])

  if (loadingAll || loading) return <p>Loading...</p>
  if (errorAll || error)
    return <p>Err:{JSON.stringify({ errorAll, errorCompute })}</p>
  return (
    <>
      <p>Data: {all ? JSON.stringify(all.length) : 0}</p>
      <hr />
      <small>Data: {all ? JSON.stringify(all[all.length - 1]) : 0}</small>
      <hr />
      hash: {hash} <br />
      salt: {salt} <br />
      energy: {energy} <br />
      start: {start} <br />
      end: {end} <br />
      <hr />
      certVanilla: {JSON.stringify(certVanilla)}
      <hr />
      <hr />
    </>
  )
}
