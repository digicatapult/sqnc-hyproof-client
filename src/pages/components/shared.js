import styled from 'styled-components'
import React from 'react'

import {
  CertificateCO2Icon,
  CertificateIssuedIcon,
  CertificatePendingIcon,
  CertificateRevokedIcon,
  PadlockIcon,
  ClockIcon,
} from '@digicatapult/ui-component-library'

export const NameCell = ({ name, date }) => (
  <Col>
    <Row>
      <PadlockIcon />
      <Title>{name}</Title>
    </Row>
    <Row>
      <ClockIcon />
      <Date>{date}</Date>
    </Row>
  </Col>
)

export const StatusCell = ({ color = '#27847a', Icon, status }) => (
  <Col>
    <Icon />
    <Status color={color}>{status}</Status>
  </Col>
)

export const stateToStatus = {
  pending: <StatusCell Icon={CertificatePendingIcon} status={'Pending'} />,
  initiated: <StatusCell Icon={CertificatePendingIcon} status={'Pending'} />,
  issued: <StatusCell Icon={CertificateIssuedIcon} status={'Issued'} />,
  revoked: (
    <StatusCell
      Icon={CertificateRevokedIcon}
      status={'Revoked'}
      color={'red'}
    />
  ),
  cancelled: (
    <StatusCell
      Icon={CertificateRevokedIcon}
      status={'Cancelled'}
      color={'red'}
    />
  ),
  co2: <StatusCell Icon={CertificateCO2Icon} status={'C.Embodiment'} />,
}

const Title = styled('div')`
  color: #6aa685;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 0px; /* 0% */
`

const Status = styled('div')`
  width: 90px;
  background-color: ${(props) => props.color || '#27847a'};
  color: #fff;
  border-radius: 60px;

  text-align: center;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px; /* 83.333% */
`

const Date = styled('div')`
  color: #27847a;

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px; /* 83.333% */
`

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`

const Col = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`
export const TimelineDisclaimer = styled('div')`
  padding: 50px 20px;
  color: #33e58c;
  opacity: 0.5;
  font-size: 12px;
  line-height: 20px;
`
