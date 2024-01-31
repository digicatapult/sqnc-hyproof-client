import React from 'react'

export const Context = React.createContext({})

// this is a provider for initial and state updates
export const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    current: 'heidi',
    showSelector: true,
    emma: {
      name: 'Emma Emma',
      origin: 'http://localhost:8010',
    },
    heidi: {
      name: 'Heidi Heidi',
      company: "Heidi's Hydroelectric Hydrogen",
      origin: 'http://localhost:8000',
    },
    reginald: {
      name: 'Reginald Reginald',
      origin: 'http://localhost:8020',
    },
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
