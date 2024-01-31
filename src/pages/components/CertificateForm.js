import React, { useState, useCallback /*, useEffect*/ } from 'react'
import styled from 'styled-components'

import { Grid, Timeline } from '@digicatapult/ui-component-library'
import CertificateInputFields from './CertificateInputFields'
import CertificateFormHeader from './CertificateFormHeader'
import CertificateActionsButtons from './CertificateActionsButtons'

import useAxios from '../../hooks/use-axios'

const useCallbackChVal = (set) => useCallback((e) => set(e.target.value), [set])

export default function CertificateForm(props) {
  const origin = props.origin

  const [sdVal, setSdVal] = useState('2024-01-01')
  const [stVal, setStVal] = useState('00:00')
  const [edVal, setEdVal] = useState('2024-01-01')
  const [etVal, setEtVal] = useState('23:55')
  const [enVal, setEnVal] = useState('')
  const [szVal, setSzVal] = useState('')

  // const [certSubmittedLocal, setCertSubmittedLocal] = useState(false)
  // const [certSubmittedChain, setCertSubmittedChain] = useState(false)

  const [loading, setLoading] = useState(false)

  const [dataLocal, setDataLocal] = useState(null)
  const [dataChain, setDataChain] = useState(null)
  const [dataFinal, setDataFinal] = useState(null)

  const {
    // data: dataLocal,
    error: errorLocal,
    // loading: loadingLocal,
    callApiFn: callApiFnLocal,
  } = useAxios()

  const {
    // data: dataChain,
    error: errorChain,
    // loading: loadingChain,
    callApiFn: callApiFnChain,
  } = useAxios()

  const {
    error: errorFinal,
    // loading: loadingFinal,
    callApiFn: callApiFnFinal,
  } = useAxios()

  const handleSdChgeVal = useCallbackChVal(setSdVal)
  const handleStChgeVal = useCallbackChVal(setStVal)
  const handleEdChgeVal = useCallbackChVal(setEdVal)
  const handleEtChgeVal = useCallbackChVal(setEtVal)
  const handleEnChgeVal = useCallbackChVal(setEnVal)
  const handleSzChgeVal = useCallbackChVal(setSzVal)

  const handleSubmitStepLocal = useCallback(
    (e) => {
      e.preventDefault()
      setLoading(true)
      const en = enVal ? (parseFloat(enVal) * 1000000) | 0 : 2000000
      const sd = sdVal || '2024-01-01'
      const st = stVal || '10:00'
      const ed = edVal || '2024-01-01'
      const et = etVal || '20:00'
      const re = 'Reginald'
      const eo = 'Emma'
      const sz = szVal ? (parseFloat(szVal) * 1000000) | 0 : 3000000
      const startTimestamp = `${sd}T${st}:00.000Z`
      const endTimestamp = `${ed}T${et}:00.000Z`
      const body = {
        energy_consumed_wh: parseInt(en),
        production_start_time: startTimestamp,
        production_end_time: endTimestamp,
        regulator: re,
        energy_owner: eo,
        hydrogen_quantity_wh: parseInt(sz),
      }
      // const origin = props.origin //'http://localhost:8000'
      const path = '/v1/certificate'
      const url = `${origin}${path}`
      callApiFnLocal(url, body).then((d) => {
        setDataLocal(d)
        const heidiLocalId = d?.id
        const body = {}
        // const origin = props.origin //'http://localhost:8000'
        const path = `/v1/certificate/${heidiLocalId}/initiation`
        const url = `${origin}${path}`
        if (d.state === 'pending') {
          callApiFnChain(url, body).then((d) => {
            setDataChain(d)
            const heidiLocalId = d?.local_id
            // const origin = props.origin //'http://localhost:8000'
            const path = `/v1/certificate/${heidiLocalId}`
            const url = `${origin}${path}`
            if (d?.state === 'submitted') {
              ;(async function () {
                let isFinalised = false
                const wait = (ms) => new Promise((res) => setTimeout(res, ms))
                while (!isFinalised) {
                  const d = await callApiFnFinal(url)
                  setDataFinal(d)
                  if (d?.state === 'initiated') isFinalised = true
                  // if (d?.state === 'initiated') alert(`Data on-chain: ${d.id}`)
                  await wait(1000)
                }
                setLoading(false)
              })()
            }
          })
        }
      })
    },
    [
      enVal,
      sdVal,
      stVal,
      edVal,
      etVal,
      szVal,
      origin,
      callApiFnLocal,
      callApiFnChain,
      callApiFnFinal,
    ]
  )

  // const handleSubmitStepChain = useCallback(
  //   (heidiLocalId) => {
  //     const body = {}
  //     const origin = 'http://localhost:8000'
  //     const path = `/v1/certificate/${heidiLocalId}/initiation`
  //     const url = `${origin}${path}`
  //     callApiFnChain(url, body)
  //   },
  //   [callApiFnChain]
  // )

  // useEffect(() => {
  //   if (dataLocal === null) return
  //   const state = dataLocal?.state
  //   if (state === 'pending') {
  //     setCertSubmittedLocal(true)
  //     handleSubmitStepChain(dataLocal?.id) // aka: heidi_local_id
  //   }
  // }, [dataLocal, handleSubmitStepChain])

  // useEffect(() => {
  //   if (dataChain === null) return
  //   const state = dataChain?.state
  //   if (state === 'submitted' || state === 'initiated') {
  //     setCertSubmittedChain(true)
  //     alert(`On Chain With Local Id: ${dataChain.local_id}`)
  //   }
  // }, [dataChain, handleSubmitStepChain])

  // useEffect(() => {
  //   if (certSubmittedLocal && certSubmittedChain) {
  //     alert('The certificate should be on chain by now!')
  //   }
  // }, [certSubmittedLocal, certSubmittedChain])

  return (
    <>
      <TimelineWrapper area="timeline">
        <Timeline {...props}>
          {props.items.map(({ message, ...rest }) => (
            <Timeline.Item key={rest.title} {...props} {...rest}>
              {message && <p>{message}</p>}
            </Timeline.Item>
          ))}
        </Timeline>
        <TimelineDisclaimer>{props.disclaimer}</TimelineDisclaimer>
      </TimelineWrapper>
      <Form action="" onSubmit={handleSubmitStepLocal}>
        <Grid.Panel area="main">
          <CertificateFormHeader />
          <CertificateInputFields
            sdVal={sdVal}
            handleSdChgeVal={handleSdChgeVal}
            stVal={stVal}
            handleStChgeVal={handleStChgeVal}
            edVal={edVal}
            handleEdChgeVal={handleEdChgeVal}
            etVal={etVal}
            handleEtChgeVal={handleEtChgeVal}
            enVal={enVal}
            handleEnChgeVal={handleEnChgeVal}
            szVal={szVal}
            handleSzChgeVal={handleSzChgeVal}
          />
        </Grid.Panel>
        {/* <CertificateActionsButtons
          data={dataChain}
          error={errorLocal || errorChain}
          loading={loadingLocal || loadingChain}
        /> */}
        <CertificateActionsButtons
          data={dataFinal ? dataFinal : dataChain ? dataChain : dataLocal}
          error={errorLocal || errorChain || errorFinal}
          loading={loading}
        />
      </Form>
    </>
  )
}

const Form = styled.form`
  display: grid;
  grid: subgrid / subgrid;
  grid-area: 1 / 1 / -1 / -1;
`

const TimelineWrapper = styled(Grid.Panel)`
  max-width: 400px;
  max-height: 100%;
  padding: 20px 0px;
  overflow: hidden;
  background: #0c3b38;
`

const TimelineDisclaimer = styled('div')`
  padding: 50px 20px;
  color: #33e58c;
  opacity: 0.5;
  font-size: 12px;
  line-height: 20px;
`
