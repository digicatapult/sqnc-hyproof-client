import React from 'react'
import styled from 'styled-components'

export default function InputFieldEnergy({ val, onChangeVal, name, id }) {
  return (
    <>
      <Label htmlFor={id}>H2 batch</Label>
      {/* <Input defaultValue="0.0 kWh" type="text" /> */}

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
      {/* Styling: https://www.npmjs.com/package/datalist-css */}
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

const Input = styled.input`
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
