import { createContext, useContext } from 'react'

const GrammarContext = createContext(undefined)

export const GrammarProvider = ({ children, data }) => {
  return <GrammarContext.Provider value={data}>{children}</GrammarContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGrammarData = () => useContext(GrammarContext)
