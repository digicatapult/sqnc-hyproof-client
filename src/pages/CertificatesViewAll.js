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
      <Timeline area="timeline"></Timeline>
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
              navigate(`/certificate/${item.original_token_id}`)
            }
            headers={headersMap[current]}
            rows={data.map((cert) => [
              /* TODO with other cert viewing stories
                  - create rows/cels per persona using "headersMap as an example"*/
              <NameCell
                key={cert.id}
                date={new Date(cert.created_at).toISOString()}
                name={`SQNC-HYPROOF-${cert.original_token_id.toString().padStart(4, '0')}`}
              />,
              `${cert.hydrogen_quantity_wh}`,
              `${cert.energy_consumed_wh}`,
              `${cert.embodied_co2}`,
              stateToStatus[(cert.embodied_co2 && 'co2') || cert.state],
            ])}
            variant="hyproof"
          />
        )}
        {data?.length === 0 && 'nothing to render'}
      </Main>
    </>
  )
}

const Timeline = styled(Grid.Panel)`
  background: rgb(39, 132, 122);
`

const Main = styled(Grid.Panel)`
  background: rgb(39, 132, 122);
  color: #fff;
  width: 100%;
  align-self: center;
  height: 100%;
  padding: 28px;
`
