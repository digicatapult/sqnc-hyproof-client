/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function useAxiosOld(run = false, urlRun, bodyRun, methodRun, headersRun) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callApiFn = useCallback(
    async (url, body, method, headers, cancelState) => {
      setLoading(true)
      headers = headers || { 'content-type': 'application/json' }
      method = method || (body ? 'post' : 'get')
      const options = body ? [url, body, { headers }] : [url, { headers }]

      try {
        const res = await axios[method](...options)
        console.log('after res await', cancelState)
        if (cancelState.cancelled == false) {
          setData(res.data)
          const { status } = res
          if (status >= 400) {
            setError(res)
          } else {
            setData(res.data)
            setLoading(false)
            return res.data
          }
        }
      } catch (err) {
        console.log('before catch error', cancelState)
        if (cancelState.cancelled == false) {
          setError(err)
          setLoading(false)
        }
      }
    },
    []
  )

  useEffect(() => {
    const cancelState = { cancelled: false }

    if (!run) return

    callApiFn(urlRun, bodyRun, methodRun, headersRun, cancelState)

    return () => {
      // console.log('cleanup', cancelState)
      cancelState.cancelled = true
    }
  }, [run, urlRun, bodyRun, methodRun, headersRun, callApiFn])

  return { data, error, loading, callApiFn }
}

export default useAxiosOld