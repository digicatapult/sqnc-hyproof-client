import React, { useContext } from 'react'
import styled from 'styled-components'
import { Grid, Spinner, Table } from '@digicatapult/ui-component-library'

import Nav from './components/Nav'
import Header from './components/Header'

import BgMoleculesImageSVG from '../assets/images/molecules-bg-repeat.svg'
import { Context } from '../utils/Context'
import { stateToStatus, NameCell } from './components/shared'
import { personas } from '../App'
import { useNavigate } from 'react-router-dom'
import useAxios from '../hooks/use-axios'
import { formatDate, formatCertName, checkCO2Status } from '../utils/helpers'

// TODO call identity?
const mapOwner = {
  '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY': 'Heidi',
  '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y': 'Regulator',
  '': 'Emma',
}

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
    'Electric energy use',
    'Production Start',
    'Production End',
    'Status',
  ],
  reginald: [
    'Date',
    'H2 Batch size',
    'H2 Certificate holder',
    'Carbon Embodiment',
    'Status',
  ],
}

const aggregateData = (data, id) => {
  const rowsMap = {
    heidi: (certs) =>
      certs.map((cert) => [
        <NameCell
          key={cert.id}
          date={formatDate(cert.created_at)}
          name={formatCertName(cert)}
        />,
        `${cert.hydrogen_quantity_wh / 1000000} MWh`,
        `${cert.energy_consumed_wh / 1000000} MWh`,
        cert?.embodied_co2
          ? `${(cert.embodied_co2 / 1000).toFixed(1)} Kg CO2e`
          : '',
        stateToStatus[checkCO2Status(cert)],
      ]),
    emma: (certs) => [...certs],
    reginald: (certs) =>
      certs.map((cert) => [
        <NameCell
          key={cert.id}
          date={formatDate(cert.created_at)}
          name={formatCertName(cert)}
        />,
        `${cert.hydrogen_quantity_wh / 1000000} MWh`,
        mapOwner[cert.hydrogen_owner] || 'unknown',
        cert?.embodied_co2
          ? `${(cert.embodied_co2 / 1000).toFixed(1)} Kg CO2e`
          : '',
        stateToStatus[checkCO2Status(cert)],
      ]),
  }

  return rowsMap[id](data)
}

export default function CertificatesViewAll() {
  const { current } = useContext(Context)
  const { data, loading, error, callApiFn: fetch } = useAxios()
  const navigate = useNavigate()

  const persona = personas.find(({ id }) => id === current)
  const url = `${persona.origin}/v1/certificate`

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
            action={(cert) =>
              navigate(`/certificate/${cert.original_token_id || cert.id}`)
            }
            headers={headersMap[current]}
            rows={aggregateData(data, current)}
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
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
`
const Sidebar = styled(Grid.Panel)`
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
`

const Main = styled(Grid.Panel)`
  background: #228077 url(${BgMoleculesImageSVG}) repeat;
  background-size: 100px;
  color: #fff;
  width: 80%;
  align-self: start;
  font-family: Roboto;
  height: 100%;
  padding: 28px;
`
