import React from 'react'
import styled from 'styled-components'

import BgIconDateSVG from '../../assets/images/icon-date.svg'

export default function InputFieldDate({ val, onChangeVal, name }) {
  return (
    <Label2>
      <BgSpan2>Date</BgSpan2>
      <Input2
        name={name}
        value={val}
        onChange={(e) => onChangeVal(e)}
        placeholder="01/01/2024"
      />
    </Label2>
  )
}

const Label2 = styled.label`
  display: grid;
  width: 100%;
  color: #7b9390;
  font: 500 14px/26px Roboto;
`

const BgSpan2 = styled.span`
  width: 100%;
  display: flex;
  &::before {
    content: '';
    display: grid;
    width: 26px;
    height: 26px;
    background: transparent url(${BgIconDateSVG}) no-repeat;
  }
`

const Input2 = styled.input.attrs({ type: 'date' })`
  width: 100%;
  height: 26px;
  min-width: 110px;
  font: 500 18px/26px Roboto;
  color: #aebcbb;
  background: transparent;
  outline: 0;
  border: none;
  position: relative;
  z-index: 0;
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: unset;
    left: unset;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    z-index: 1;
  }
  &::-webkit-inner-spin-button {
    z-index: 1;
  }
  &::-webkit-clear-button {
    z-index: 1;
  }
  &::-webkit-input-placeholder {
    color: #aebcbb;
  }
  &::placeholder {
    color: #aebcbb;
  }
  &:active {
    color: #000000;
  }
  &:hover {
    color: #000000;
  }
`
