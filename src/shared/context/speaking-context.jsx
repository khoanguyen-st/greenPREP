import { createContext, useContext } from 'react'

const SpeakingContext = createContext(undefined)

export const SpeakingProvider = ({ children, data }) => {
  return <SpeakingContext.Provider value={data}>{children}</SpeakingContext.Provider>
}

export const useSpeakingData = () => useContext(SpeakingContext)
