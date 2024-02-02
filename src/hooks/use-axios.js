/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { useEffect } from 'react'
import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function useAxios(run = false, keys = ['key'], urlRun, bodyRun, methodRun, headersRun) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { /*data, error, loading, */mutateAsync: callApiFn } = useMutation({
    mutationFn: async (url, body, method, headers) => {
      setLoading(true)
      headers = headers || { 'content-type': 'application/json' }
      method = method || (body ? 'post' : 'get')
      const options = body ? [url, body, { headers }] : [url, { headers }]
      return await axios[method](...options)
    },
    onSuccess: async (res) => {
      setData(res.data)
      setLoading(false)
    },
    onError: async (error) => {
      setError(error)
      setLoading(false)
    },
    cacheTime: 0,
    queryKey: [ ...keys ],
  })

  useEffect(() => {
    if (!run) return

    callApiFn(urlRun, bodyRun, methodRun, headersRun)
  }, [run, urlRun, bodyRun, methodRun, headersRun, callApiFn])

  return { data, error, loading, callApiFn }
}
