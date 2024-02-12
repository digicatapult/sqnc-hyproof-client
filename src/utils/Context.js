import React from 'react'

export const Context = React.createContext({})

// this is a provider for initial and state updates
export const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    current: 'heidi',
    currentId: '',
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
