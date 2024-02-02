import { useEffect, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import axios from 'axios'

export default function useAxios(
  run = false,
  keys = ['key'],
  urlRun,
  bodyRun,
  methodRun,
  headersRun
) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

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
        return new Error(err)
      }
    },
    onSuccess: async (res) => {
      setData(res.data)
      setLoading(false)
      queryClient.invalidateQueries(keys)
    },
    onError: async (error) => {
      setError(error)
      setLoading(false)
    },
    queryKey: [...keys.toString()],
    cacheTime: 0,
  })

  useEffect(() => {
    if (!run) return

    callApiFn({
      url: urlRun,
      body: bodyRun,
      method: methodRun,
      headers: headersRun,
    })
  }, [run, urlRun, bodyRun, methodRun, headersRun, callApiFn])

  return { data, error, loading, callApiFn }
}
