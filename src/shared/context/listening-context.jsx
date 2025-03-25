import { createContext, useContext } from 'react'

const ListeningContext = createContext(undefined)

export const ListeningProvider = ({ children, data }) => {
  return <ListeningContext.Provider value={data}>{children}</ListeningContext.Provider>
}

export const useListeningData = () => useContext(ListeningContext)
