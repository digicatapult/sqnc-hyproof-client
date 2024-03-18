import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { Context } from '../../utils/Context'

import { Grid, Timeline } from '@digicatapult/ui-component-library'
import CertificateInputFields from './CertificateInputFields'
import CertificateFormHeader from './CertificateFormHeader'
import CertificateActionsButtons from './CertificateActionsButtons'

import useAxios from '../../hooks/use-axios'
import { useNavigate } from 'react-router-dom'
import { TimelineDisclaimer } from './shared.js'

import { personas } from '../../App'

const disclaimer =
  'Your certification status is dynamic and may change  over time. Always refer to this page for the most up-to-date status.'

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

export default function CertificateForm() {
  const { current, update } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  const origin = persona.origin

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

  const navigate = useNavigate()

  const handleSubmitStep = useCallback(
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
          let originalTokenId = null
          while (!isFinalised) {
            const res = await callApiFnFinal({ url: `${origin}${path}` })
            setDataFinal(res)
            if (res?.state === 'initiated') isFinalised = true
            originalTokenId = res?.original_token_id
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
          setLoading(false)
          const {
            commitment: currentCommitment,
            commitment_salt: currentCommitmentSalt,
            energy_consumed_wh: currentEnergyConsumedWh,
            production_start_time: currentProductionStartTime,
            production_end_time: currentProductionEndTime,
          } = resLocal
          update({
            currentId: originalTokenId,
            currentCommitment,
            currentCommitmentSalt,
            currentEnergyConsumedWh,
            currentProductionStartTime,
            currentProductionEndTime,
          })
          navigate(`/certificate/${originalTokenId}`)
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
      update,
      navigate,
    ]
  )

  return (
    <>
      <TimelineWrapper area="timeline">
        <Timeline
          name={dataChain?.id && persona.company}
          disclaimer={disclaimer}
          variant={'hyproof'}
        >
          <Timeline.Item
            variant="hyproof"
            title={'Initiated'}
            checked={dataFinal?.state === 'initiated'}
          >
            {dataFinal?.state === 'initiated' ? dataFinal.created_at : null}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Carbon Embodiment'}
            checked={dataFinal?.embodied_co2}
          >
            {dataFinal?.embodied_co2 && formatDate(dataFinal.updated_at)}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Issued'}
            checked={dataFinal?.state === 'issued'}
          >
            {dataFinal?.state === 'issued' && formatDate(dataFinal.updated_at)}
          </Timeline.Item>
        </Timeline>
        <TimelineDisclaimer>{disclaimer}</TimelineDisclaimer>
      </TimelineWrapper>
      <Form action="" onSubmit={handleSubmitStep}>
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
  grid-area: 2 / 2 / -1 / -1;
`

const TimelineWrapper = styled(Grid.Panel)`
  max-height: 100%;
  padding: 20px 0px;
  overflow: hidden;
  background: #0c3b38;
`
