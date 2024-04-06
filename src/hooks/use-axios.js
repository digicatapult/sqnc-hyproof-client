import { useCallback, useEffect, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'

import axios from 'axios'

// Custom hook for making HTTP requests
// Notes:
// Can be used with useAxios(true, '...') for an automatic call on component mount.
// Additionally, can be used with useAxios(false, '...') for a manual call.
// Also, can also be used w/ { refetchApiFn } = useAxios(false, '...', url) for state-less call.
export default function useAxios(
  run = false,
  urlRun,
  bodyRun,
  methodRun,
  headersRun,
  url
) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { mutateAsync: callApiFn } = useMutation({
    mutationFn: async (args) => {
      setLoading(true)
      let { url, body, method, headers } = args
      method = method || (body ? 'post' : 'get')
      headers = headers || { 'content-type': 'application/json' }
      const options = body ? [url, body, { headers }] : [url, { headers }]
      try {
        const res = await axios[method](...options)
        if (res.status >= 400) return new Error(res.status)
        return res.data
      } catch (err) {
        setLoading(false)
        setError(err)
        return new Error(err)
      }
    },
    onSuccess: async (res) => {
      setLoading(false)
      return res instanceof Error
        ? setError(res.message)
        : setData(res.data || res)
    },
    onError: async (error) => {
      setError(error)
      setLoading(false)
    },
    cacheTime: 0,
  })

  const { refetch: refetchApiFn } = useQuery({
    queryKey: [url],
    queryFn: useCallback(async () => {
      const headers = { 'content-type': 'application/json' }
      const options = [url, { headers }]
      const method = 'get'
      try {
        const res = await axios[method](...options)
        if (res.status >= 400) return new Error(res.status)
        return res.data
      } catch (err) {
        return new Error(err)
      }
    }, [url]),
  })

  useEffect(() => {
    if (!run) return

    callApiFn({
      url: urlRun,
      body: bodyRun,
      method: methodRun,
      headers: headersRun,
    }).then((data) => setData(data))
  }, [run, urlRun, bodyRun, methodRun, headersRun, callApiFn])

  return { data, error, loading, callApiFn, refetchApiFn }
}
