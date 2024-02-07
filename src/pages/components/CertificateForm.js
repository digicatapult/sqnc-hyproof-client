import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import { Grid, Timeline } from '@digicatapult/ui-component-library'
import CertificateInputFields from './CertificateInputFields'
import CertificateFormHeader from './CertificateFormHeader'
import CertificateActionsButtons from './CertificateActionsButtons'

import useAxios from '../../hooks/use-axios'

const useCallbackChVal = (set) => useCallback((e) => set(e.target.value), [set])

const callBodyCrafter = (enVal, sdVal, stVal, edVal, etVal, szVal) => {
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
  return body
}

export default function CertificateForm(props) {
  const origin = props.origin

  const [sdVal, setSdVal] = useState('2024-01-01')
  const [stVal, setStVal] = useState('00:00')
  const [edVal, setEdVal] = useState('2024-01-01')
  const [etVal, setEtVal] = useState('23:55')
  const [enVal, setEnVal] = useState('')
  const [szVal, setSzVal] = useState('')

  const [loading, setLoading] = useState(false)
  const [dataLocal, setDataLocal] = useState(null)
  const [dataChain, setDataChain] = useState(null)
  const [dataFinal, setDataFinal] = useState(null)

  const { error: errorLocal, callApiFn: callApiFnLocal } = useAxios(false)
  const { error: errorChain, callApiFn: callApiFnChain } = useAxios(false)
  const { error: errorFinal, callApiFn: callApiFnFinal } = useAxios(false)

  const handleSdChgeVal = useCallbackChVal(setSdVal)
  const handleStChgeVal = useCallbackChVal(setStVal)
  const handleEdChgeVal = useCallbackChVal(setEdVal)
  const handleEtChgeVal = useCallbackChVal(setEtVal)
  const handleEnChgeVal = useCallbackChVal(setEnVal)
  const handleSzChgeVal = useCallbackChVal(setSzVal)

  const handleSubmitStepLocal = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      const body = callBodyCrafter(enVal, sdVal, stVal, edVal, etVal, szVal)
      const path = '/v1/certificate'
      const resLocal = await callApiFnLocal({ url: `${origin}${path}`, body })
      setDataLocal(resLocal)
      if (resLocal?.state === 'pending') {
        const path = `/v1/certificate/${resLocal?.id}/initiation`
        const body = {}
        const resChain = await callApiFnChain({ url: `${origin}${path}`, body })
        setDataChain(resChain)
        if (resChain?.state === 'submitted') {
          const path = `/v1/certificate/${resChain?.local_id}`
          let isFinalised = false
          while (!isFinalised) {
            const res = await callApiFnFinal({ url: `${origin}${path}` })
            setDataFinal(res)
            if (res?.state === 'initiated') isFinalised = true
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
          setLoading(false)
        }
      }
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
        <CertificateActionsButtons
          data={dataFinal ? dataFinal : dataChain ? dataChain : dataLocal}
          error={errorLocal || errorChain || errorFinal}
          loading={loading}
          valid={
            parseFloat(enVal) > 0 &&
            parseFloat(szVal) > 0 &&
            new Date(`${sdVal} ${stVal}`) < new Date(`${edVal} ${etVal}`)
          }
        />
      </Form>
    </>
  )
}

const Form = styled.form`
  display: grid;
  grid: subgrid / subgrid;
  grid-area: 1 / 1 / -1 / -1;
  overflow: hidden;
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
