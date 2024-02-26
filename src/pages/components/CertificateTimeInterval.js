import React from 'react'
import styled from 'styled-components'

import StartEndSpacerSVG from '../../assets/images/start-end-spacer-bg.svg'

const calcTimeInterval = (s, e) => {
  return new Date(e) - new Date(s)
}
const convIntervalToHoursAndMins = (i) => {
  const m = Math.floor(i / (1000 * 60)) % 60
  const h = Math.floor(i / (1000 * 60 * 60))
  const str = `${h.toString().padStart(2, '0')}H ${m.toString().padStart(2, '0')}M`
  return str
}
const convIntervalToMonthsAndDays = (i) => {
  let d = Math.floor(i / (1000 * 60 * 60 * 24)) % 30
  let m = Math.floor(i / (1000 * 60 * 60 * 24 * 30))
  let str = `${m.toString().padStart(2, '0')}m ${d.toString().padStart(2, '0')}d`
  if (m > 99) {
    d = 0
    m = 99
    str = `>${m.toString().padStart(2, '0')}m${d.toString().padStart(2, '0')}d`
  }
  return str
}
const convIntervalToStr = (s, e) => {
  const i = calcTimeInterval(s, e)
  if (i > 1000 * 24 * 60 * 60) {
    return convIntervalToMonthsAndDays(i)
  } else {
    return convIntervalToHoursAndMins(i)
  }
}

export default function CertificateTimeInterval({
  sTimestamp,
  eTimestamp,
  bgColor,
}) {
  return (
    <FixedWidthSmallDiv bg={bgColor}>
      {convIntervalToStr(sTimestamp, eTimestamp)}
    </FixedWidthSmallDiv>
  )
}

const FixedWidthSmallDiv = styled.div`
  width: 98px;
  height: 82px;
  margin-top: 28px;
  text-align: center;
  color: #67a8a1;
  font: 500 14px/82px Roboto;
  background-image: url(${StartEndSpacerSVG});
  background-color: ${({ bg }) => (bg === 'white' ? '#efefef' : '#27847a')};
  background-repeat: no-repeat;
`
