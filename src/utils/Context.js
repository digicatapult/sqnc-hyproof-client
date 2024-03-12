import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext({})

const stateKey = 'demo-state'
const defaultState = {
  current: 'heidi',
  currentId: '',
  currentCommitment: '',
  currentCommitmentSalt: '',
  currentEnergyConsumedWh: 0,
  currentProductionStartTime: '',
  currentProductionEndTime: '',
  emma: {},
  heidi: {},
  reginald: {},
}
let initState = defaultState
try {
  initState = JSON.parse(localStorage.getItem(stateKey)) || initState
} catch (e) {
  localStorage.removeItem(stateKey)
}

// this is a provider for initial and state updates
export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    ...initState,
    update: (val, key) => {
      if (!val) return state
      if (!key) return setState({ ...state, ...val })

      setState({
        ...state,
        [key]: {
          ...state[key],
          ...val,
        },
      })
    },
    reset: () => {
      localStorage.removeItem(stateKey)
    },
  })

  useEffect(() => {
    const { update, ...storedState } = state
    localStorage.setItem(stateKey, JSON.stringify(storedState))
  }, [state])

  return <Context.Provider value={state}>{children}</Context.Provider>
}
