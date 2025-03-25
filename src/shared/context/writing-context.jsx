import { createContext, useContext } from 'react'

const WritingContext = createContext(undefined)

export const WritingProvider = ({ children, data }) => {
  return <WritingContext.Provider value={data}>{children}</WritingContext.Provider>
}

export const useWritingData = () => useContext(WritingContext)
