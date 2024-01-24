import React from 'react'
import styled from 'styled-components'

import BgIconTimeSVG from '../../assets/images/icon-time.svg'

export default function InputFieldTime({ val, onChangeVal, name }) {
  return (
    <>
      <Label2>
        <BgSpan2>Time</BgSpan2>
        <Input2
          name={name}
          value={val}
          onChange={(e) => onChangeVal(e)}
          placeholder="00:00"
        />
      </Label2>
      {/*
      <Label htmlFor={id}>
        <BgTimeSpan>&nbsp;</BgTimeSpan>Time
      </Label>
      <Input
        name={name}
        id={id}
        value={val}
        onChange={(e) => onChangeVal(e)}
        placeholder="00:00"
      />
      */}
      {/* <Input defaultValue="00:00" type="time" /> */}
    </>
  )
}

const Label2 = styled.label`
  display: grid;
  width: 100%;
  color: #7b9390;
  font: 500 14px/26px Roboto;
`

// const Label = styled.label`
//   display: flex;
//   width: calc(100% - 0px);
//   height: 26px;
//   // line-height: 26px;
//   // margin-left: 15px;
//   color: #7b9390;
//   font: 500 14px/26px Roboto;
// `

const BgSpan2 = styled.span`
  width: 100%;
  display: flex;
  &::before {
    content: '';
    display: grid;
    width: 26px;
    height: 26px;
    background: transparent url(${BgIconTimeSVG}) no-repeat;
  }
`

// const BgTimeSpan = styled.span`
//   width: 26px;
//   height: 26px;
//   background: transparent url(${BgIconTimeSVG}) no-repeat;
// `

const Input2 = styled.input.attrs({ type: 'time' })`
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

// const Input = styled.input.attrs({ type: 'time' })`
//   display: flex;
//   width: calc(100% - 0px);
//   height: 26px;
//   min-width: 90px;
//   font: 500 18px/26px Roboto;
//   color: #aebcbb;
//   // margin-left: 15px;
//   background: transparent;
//   outline: 0;
//   border: none;
//   position: relative;
//   &::-webkit-calendar-picker-indicator {
//     position: absolute;
//     top: unset;
//     left: unset;
//     width: 100%;
//     height: 100%;
//     background: transparent;
//     color: transparent;
//   }
//   &::-webkit-inner-spin-button {
//     z-index: 1;
//   }
//   &::-webkit-clear-button {
//     z-index: 1;
//   }
//   &::-webkit-input-placeholder {
//     color: #aebcbb;
//   }
//   &::placeholder {
//     color: #aebcbb;
//   }
//   &:active {
//     color: #000000;
//   }
//   &:hover {
//     color: #000000;
//   }
// `
