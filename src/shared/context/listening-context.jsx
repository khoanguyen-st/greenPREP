import { createContext, useContext } from 'react'

const ListeningContext = createContext(undefined)

export const ListeningProvider = ({ children, data }) => {
  return <ListeningContext.Provider value={data}>{children}</ListeningContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListeningData = () => useContext(ListeningContext)
