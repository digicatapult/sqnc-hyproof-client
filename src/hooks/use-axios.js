import { useState } from 'react'
import axios from 'axios'

const DELAY = 4 * 1000 // Artificial delay in ms

function useAxios() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callApiFn = (
    url,
    body,
    method,
    headers = { 'content-type': 'application/json' }
  ) => {
    setLoading(true)
    const options = body ? [url, body, { headers }] : [url, { headers }]
    method = method || (body ? 'post' : 'get')
    // const body = {
    //   energy_consumed_wh: 2000000,
    //   production_start_time: '2024-01-25T10:00:00.000Z',
    //   production_end_time: '2024-01-25T20:00:00.000Z',
    //   regulator: 'Reginald',
    //   energy_owner: 'Emma',
    //   hydrogen_quantity_wh: 2000000,
    // }
    // const headers = { 'content-type': 'application/json' }

    // const method = 'post'

    axios[method](...options)
      .then(async (res) => {
        const wait = (ms) => new Promise((res) => setTimeout(res, ms))
        if (DELAY > 0) await wait(DELAY)
        setData(res.data)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return { data, error, loading, callApiFn }
}

export default useAxios
