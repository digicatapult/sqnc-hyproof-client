import React from 'react'
import styled from 'styled-components'

import BgIconDateSVG from '../../assets/images/icon-date.svg'

export default function InputFieldDate({ val, onChangeVal, name, id }) {
  return (
    <>
      <Label htmlFor={id}>
        <BgDateSpan>&nbsp;</BgDateSpan>Date
      </Label>
      {/* <Input defaultValue={defaultVal} type="date" /> */}
      <Input
        name={name}
        id={id}
        value={val}
        onChange={(e) => onChangeVal(e)}
        placeholder="01/01/2024"
      />
    </>
  )
}

const Label = styled.label`
  display: flex;
  width: calc(100% - 15px);
  height: 26px;
  line-height: 26px;
  margin-left: 15px;
  color: #7b9390;
  font: 500 14px/26px Roboto;
`

const BgDateSpan = styled.span`
  width: 26px;
  height: 26px;
  background: transparent url(${BgIconDateSVG}) no-repeat;
`

const Input = styled.input.attrs({ type: 'date' })`
  display: flex;
  width: calc(100% - 15px);
  height: 26px;
  font: 500 18px/26px Roboto;
  color: #aebcbb;
  margin-left: 15px;
  background: transparent;
  outline: 0;
  border: none;
  position: relative;
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: unset;
    left: unset;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
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
