import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { Grid, Timeline } from '@digicatapult/ui-component-library'

import { Context } from '../../utils/Context'
import CertificateInputFields from './CertificateInputFields'
import CertificateFormHeader from './CertificateFormHeader'
import CertificateActionsButtons from './CertificateActionsButtons'
import useAxios from '../../hooks/use-axios'
import { personas } from '../../App'
import { formatTimelineDate } from '../../utils/helpers'

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
  const { current, update, ...rest } = useContext(Context)
  const { fetch } = useAxios(false)

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
            [current]: resLocal, // persist as a cache
            currentId: originalTokenId,
            currentCommitment,
            currentCommitmentSalt,
            currentEnergyConsumedWh,
            currentProductionStartTime,
            currentProductionEndTime,
          })
          // navigate(`/certificate/${originalTokenId}`)
        }
      }

      update(resLocal, current)
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
      current,
    ]
  )

  const cert = dataFinal?.state === 'initiated' ? rest[current] : {}
  React.useEffect(() => {
    const get = async () => {
      const url = `${persona.origin}/v1/certificate/${dataChain.original_token_id}`
      const [data] = await fetch({ url })

      update(data, current) // drop in all res for time being so we have all properties
    }

    if (dataFinal) get()
  }, [current, dataFinal, update, fetch, dataChain, persona])

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
            title={'Initiation'}
            checked={cert.id}
          >
            {cert.id && formatTimelineDate(cert.created_at)}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Carbon Embodiment'}
            checked={cert.embodied_co2}
          >
            {persona.embodied_co2 && formatTimelineDate(cert.created_at)}
          </Timeline.Item>
          <Timeline.Item
            variant="hyproof"
            title={'Issuance'}
            checked={cert.state === 'issued'}
          >
            {cert.state === 'issued' && formatTimelineDate(cert.created_at)}
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
