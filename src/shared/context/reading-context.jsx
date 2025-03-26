import { createContext, useContext } from 'react'

const ReadingContext = createContext(undefined)

export const ReadingProvider = ({ children, data }) => {
  return <ReadingContext.Provider value={data}>{children}</ReadingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useReadingData = () => useContext(ReadingContext)
