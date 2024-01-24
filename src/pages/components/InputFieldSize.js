import React from 'react'
import { useId } from 'react-id-generator'
import styled from 'styled-components'

export default function InputFieldSize({ val, onChangeVal, name }) {
  const [id] = useId()
  return (
    <>
      <Label2>
        <Span2>H2 batch</Span2>
        <Input2
          name={name}
          // id={id}
          value={val}
          onChange={(e) => onChangeVal(e)}
          placeholder="0.0 kWh"
          list={id}
        />
        <datalist id={id}>
          {Array.from(Array(2 * 20).keys()).map((e) => {
            const r = (e + 1) / 2
            return <option key={e} value={`${r.toFixed(1)} MWh`} />
          })}
        </datalist>
      </Label2>
      {/*
      <Label htmlFor={id}>H2 batch</Label>
      <Input
        name={name}
        id={id}
        value={val}
        onChange={(e) => onChangeVal(e)}
        placeholder="0.0 kWh"
        list={`${id}-list`}
      />
      <datalist id={`${id}-list`}>
        {Array.from(Array(2 * 20).keys()).map((e) => {
          const r = (e + 1) / 2
          return <option key={e} value={`${r.toFixed(1)} MWh`} />
        })}
      </datalist>
      */}
      {/* <Input defaultValue="0.0 kWh" type="text" /> */}
      {/* Styling: https://www.npmjs.com/package/datalist-css */}
    </>
  )
}

const Label2 = styled.label`
  display: grid;
  width: 100%;
  color: #7b9390;
  font: 500 14px/26px Roboto;
  padding-left: 15px;
`

const Span2 = styled.span`
  width: 100%;
  display: flex;
`

// const Label = styled.label`
//   display: flex;
//   width: calc(100% - 15px);
//   height: 26px;
//   line-height: 26px;
//   margin-left: 15px;
//   color: #7b9390;
//   font: 500 14px/26px Roboto;
// `

const Input2 = styled.input`
  width: 100%;
  height: 26px;
  min-width: 110px;
  font: 500 18px/26px Roboto;
  color: #aebcbb;
  background: transparent;
  outline: 0;
  border: none;
  z-index: 0;
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

// const Input = styled.input`
//   display: flex;
//   width: calc(100% - 15px);
//   height: 26px;
//   font: 500 18px/26px Roboto;
//   color: #aebcbb;
//   margin-left: 15px;
//   background: transparent;
//   outline: 0;
//   border: none;
//   position: relative;
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
