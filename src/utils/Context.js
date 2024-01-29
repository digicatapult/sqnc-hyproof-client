import React from 'react'


export const initState = {
  current: 'heidi',
  emma: {},
  heidi: {
    name: 'Heidi Heidi',
    company: "Heidi's Hydroelectric Hydrogen"
  },
  reginald: {},
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
    }
  })

  return <Context.Provider value={state}>{children}</Context.Provider>
}
