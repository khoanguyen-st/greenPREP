import { createContext, useContext } from 'react'

const SpeakingContext = createContext(undefined)

export const SpeakingProvider = ({ children, data }) => {
  return <SpeakingContext.Provider value={data}>{children}</SpeakingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSpeakingData = () => useContext(SpeakingContext)
