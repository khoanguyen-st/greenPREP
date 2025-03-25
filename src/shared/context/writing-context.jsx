import { createContext, useContext } from 'react'

const WritingContext = createContext(undefined)

export const WritingProvider = ({ children, data }) => {
  return <WritingContext.Provider value={data}>{children}</WritingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWritingData = () => useContext(WritingContext)
