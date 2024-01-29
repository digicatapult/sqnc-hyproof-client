import React from 'react'

export const initState = {
  current: 'heidi',
  emma: {
    color: '#AAED93',
  },
  heidi: {
    name: 'Heidi Heidi',
    company: "Heidi's Hydroelectric Hydrogen",
    color: '#FDB6D4',
  },
  reginald: {
    color: '#FCF281',
  },
}

export const Context = React.createContext({
  current: 'heidi',
  emma: {},
  heidi: {},
  reginald: {},
  update: () => {},
})

// this is a provider for initial and state updates
export const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    ...initState,
    update: (key, val) => {
      const update = { [key]: { ...state[key], ...val } }
      setState({ ...state, [key]: update })
    },
  })

  return <Context.Provider value={state}>{children}</Context.Provider>
}
