import React from 'react'
import { useId } from 'react-id-generator'
import styled from 'styled-components'

export default function InputFieldSize({ val, onChangeVal, name }) {
  const [id] = useId()
  return (
    <Label>
      <Span>H2 batch</Span>
      <Input
        name={name}
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
    </Label>
  )
}

const Label = styled.label`
  display: grid;
  width: 100%;
  color: #7b9390;
  font: 500 14px/26px Roboto;
  padding-left: 15px;
`

const Span = styled.span`
  width: 100%;
  display: flex;
`

const Input = styled.input`
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
