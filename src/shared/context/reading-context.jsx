import { createContext, useContext } from 'react'

const ReadingContext = createContext(undefined)

export const ReadingProvider = ({ children, data }) => {
  return <ReadingContext.Provider value={data}>{children}</ReadingContext.Provider>
}

export const useReadingData = () => useContext(ReadingContext)
