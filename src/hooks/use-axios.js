import { useState } from 'react'
import axios from 'axios'

const DELAY = 4 * 1000 // Artificial delay in ms

function useAxios() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callApiFn = () => {
    setLoading(true)
    const method = 'post'
    const origin = 'http://localhost:8000'
    const path = '/v1/certificate'
    const body = {
      energy_consumed_wh: 2000000,
      production_start_time: '2024-01-25T10:00:00.000Z',
      production_end_time: '2024-01-25T20:00:00.000Z',
      regulator: 'Reginald',
      energy_owner: 'Emma',
      hydrogen_quantity_wh: 2000000,
    }
    const defaultHeaders = { 'content-type': 'application/json' }
    axios[method](origin + path, body, { headers: defaultHeaders })
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
