import React, { useContext } from 'react'
import styled from 'styled-components'
import { Grid, Spinner, Table } from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'

import { Context } from '../utils/Context'
import { stateToStatus, NameCell } from './components/shared'
import { personas } from '../App'
import { useNavigate } from 'react-router-dom'
import useAxios from '../hooks/use-axios'
import { formatTimelineDate } from '../utils/helpers'

const headersMap = {
  heidi: [
    'Date',
    'H2 Batch size',
    'Electric energy use',
    'Carbon Embodiment',
    'Status',
  ],
  emma: ['Date', 'Commitment'],
  reginald: [],
}

export default function CertificatesViewAll() {
  const { current } = useContext(Context)
  const { data, loading, error, callApiFn: fetch } = useAxios()
  const navigate = useNavigate()

  const persona = personas.find(({ id }) => id === current)
  const url = `${persona.origin}/v1/certificate`

  const checkCO2 = (cert) =>
    cert.embodied_co2 && ['issued', 'pending', 'initiated'].includes(cert.state)
      ? 'co2'
      : cert.state
  const formatName = (cert) =>
    `SQNC-HYPROOF-${(cert.original_token_id || '0').toString().padStart(4, '0')}`

  React.useEffect(() => {
    if (!data) fetch({ url })
  }, [data, fetch, url])

  return (
    <>
      <Nav />
      <Header
        userFullName={persona.name}
        companyName={error || persona.company}
      />
      <Main area="main">
        {(loading || error) && (
          <Spinner
            text={error || 'loading...'}
            size={'large'}
            color={persona.background}
          />
        )}
        {data && (
          <Table
            action={(item) =>
              navigate(`/certificate/${item.original_token_id || item.id}`)
            }
            headers={headersMap[current]}
            rows={data.map((cert) => [
              /* TODO with other cert viewing stories
                  - create rows/cels per persona using "headersMap as an example"*/
              <NameCell
                key={cert.id}
                date={formatTimelineDate(cert.created_at)}
                name={formatName(cert)}
              />,
              `${cert.hydrogen_quantity_wh / 1000000} MWh`,
              `${cert.energy_consumed_wh / 1000000} MWh`,
              cert?.embodied_co2 ? `${cert.embodied_co2 / 1000} g CO2e` : '',
              stateToStatus[checkCO2(cert)],
            ])}
            variant="hyproof"
          />
        )}
        {data?.length === 0 && 'nothing to render'}
      </Main>
      {/* due to layout have to define */}
      <Timeline area="timeline" />
      <Sidebar area="main" />
    </>
  )
}

const Timeline = styled(Grid.Panel)`
  background: rgb(39, 132, 122);
`
const Sidebar = styled(Grid.Panel)`
  background: rgb(39, 132, 122);
`

const Main = styled(Grid.Panel)`
  background: rgb(39, 132, 122);
  color: #fff;
  width: 80%;
  align-self: start;
  font-family: Roboto;
  height: 100%;
  padding: 28px;
`
