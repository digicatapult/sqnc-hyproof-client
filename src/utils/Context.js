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

// TODO this is more of an exammple how we can have a global
// state without 3rd parties e.g. redux
// this could be a single entity e.g. themeCtx
export const Context = React.createContext({
  current: 'heidi',
  emma: {},
  heidi: {},
  reginald: {},
  update: () => {},
})

// this is a provider for initial and state updates
export const ContextProvider = ({ children }) => {
  // TOO update context or create separate update method for each demo e.g. demmo1-update
  const [state, setState] = React.useState({
    ...initState,
    update: (key, val) => {
      const update = { [key]: { ...state[key], ...val } }
      setState({ ...state, [key]: update }) 
    }
  })

  return <Context.Provider value={state}>{children}</Context.Provider>
}
