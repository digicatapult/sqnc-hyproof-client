import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function useAxios(run = false, urlRun, bodyRun, methodRun, headersRun) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callApiFn = useCallback(async (url, body, method, headers) => {
    setLoading(true)
    const options = body ? [url, body, { headers }] : [url, { headers }]
    headers = headers || { 'content-type': 'application/json' }
    method = method || (body ? 'post' : 'get')

    try {
      const res = await axios[method](...options)
      setData(res.data)
      const { status } = res
      if (status >= 400) {
        setError(res)
      } else {
        setData(res.data)
        setLoading(false)
        return res.data
      }
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!run) {
      return
    }
    callApiFn(urlRun, bodyRun, methodRun, headersRun)
  }, [run, urlRun, bodyRun, methodRun, headersRun, callApiFn])

  return { data, error, loading, callApiFn }
}

export default useAxios
