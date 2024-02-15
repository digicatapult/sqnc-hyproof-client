import React, { createContext, useState } from 'react'

export const Context = createContext({})

// this is a provider for initial and state updates
export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
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
  })

  return <Context.Provider value={state}>{children}</Context.Provider>
}
