import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Spinner,
  Table,
  Button,
} from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'
import BgMoleculesImageSVG from '../assets/images/molecules-bg-repeat.svg'

import { Context } from '../utils/Context'
import { stateToStatus, NameCell } from './components/shared'
import { personas } from '../App'
import { useNavigate } from 'react-router-dom'
import useAxios from '../hooks/use-axios'
import { formatDate, formatCertName, checkCO2Status } from '../utils/helpers'

const headersMap = {
  heidi: [
    'Date',
    'H2 Batch size',
    'Electric energy use',
    'Carbon Embodiment',
    'Status',
  ],
  emma: [
    'Date',
    'H2 Batch size',
    'H2 Certificate holder',
    'Carbon Embodiment',
    'Status',
  ],
  reginald: [
    'Date',
    'H2 Batch size',
    'H2 Certificate holder',
    'Carbon Embodiment',
    'Status',
  ],
  connor: [
    'Date',
    'H2 Batch size',
    'H2 Certificate holder',
    'Carbon Embodiment',
    'Status',
  ],
}

const aggregateData = (data, id = 'default') => {
  const defaultRow = (certs) =>
    certs.map((cert) => [
      <NameCell
        key={cert.original_token_id}
        date={formatDate(cert.created_at)}
        name={formatCertName(cert)}
      />,
      `${(cert.hydrogen_quantity_wh / 1000000).toFixed(1)} MWh`,
      cert.hydrogen_owner || 'unknown',
      cert?.embodied_co2
        ? `${(cert.embodied_co2 / 1000).toFixed(1)} Kg CO2e`
        : '',
      stateToStatus[checkCO2Status(cert)],
    ])

  const rowsMap = {
    heidi: (certs) =>
      certs.map((cert) => [
        <NameCell
          key={cert.original_token_id}
          date={formatDate(cert.created_at)}
          name={formatCertName(cert)}
        />,
        `${(cert.hydrogen_quantity_wh / 1000000).toFixed(1)} MWh`,
        `${(cert.energy_consumed_wh / 1000000).toFixed(1)} MWh`,
        cert?.embodied_co2
          ? `${(cert.embodied_co2 / 1000).toFixed(1)} Kg CO2e`
          : '',
        stateToStatus[checkCO2Status(cert)],
      ]),
    emma: (certs) => defaultRow(certs),
    reginald: (certs) => defaultRow(certs),
    connor: (certs) => defaultRow(certs),
  }

  return rowsMap[id](data)
}

export default function CertificatesViewAll() {
  const { current } = useContext(Context)
  const { data, loading, error, callApiFn: fetch } = useAxios()
  const navigate = useNavigate()

  const persona = personas.find(({ id }) => id === current)
  const url = `${persona.origin}/v1/certificate`
  const redirectToCreate = () => navigate('/certificate?create=y')

  React.useEffect(() => {
    if (!data) fetch({ url })
  }, [data, fetch, url])

  return (
    <>
      <Nav />
      <Header
        userFullName={persona.name}
        companyName={error || persona.company}
        color={persona.background}
      />
      <Main>
        {(loading || error) && (
          <Spinner
            text={error || 'loading...'}
            size={'large'}
            color={persona.background}
          />
        )}
        {data && (
          <Table
            action={([{ key: original_token_id }]) => {
              if (original_token_id === 'null') {
                return window.alert(`Warning! Token_ID = ${original_token_id}`)
              }
              navigate(`/certificate/${original_token_id}`)
            }}
            headers={headersMap[current]}
            rows={aggregateData(data, current)}
            variant="hyproof"
          />
        )}
        {data?.length === 0 && 'nothing to render'}
      </Main>
      <Sidebar area="sidebar">
        {persona.id === 'heidi' && (
          <LargeButton onClick={redirectToCreate} variant="roundedPronounced">
            New Certificate
          </LargeButton>
        )}
      </Sidebar>
    </>
  )
}

const Sidebar = styled(Grid.Panel)`
  align-items: center;
  background: #0c3b38;
  align-items: center;
  justify-items: center;
  color: white;
  gap: 10px;
  padding: 34px 21px;
`

const Main = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;
  isolation: isolate;
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
  color: #fff;
  align-self: start;
  font-family: Roboto;
  height: 100%;
  padding: 28px;

  & > * {
    margin-inline: auto;
    max-width: 1200px;
  }
`

const LargeButton = styled(Button)`
  min-height: 60px;
  width: 100%;
  font: normal 500 21px Roboto;
  white-space: nowrap;
  color: #33e58c;
  border: 1px solid #2fe181;
  background: #124338;
  &:hover {
    opacity: 0.6;
  }
  &:disabled {
    color: #1c774a;
    border: 1px solid #1c774a;
  }
`
