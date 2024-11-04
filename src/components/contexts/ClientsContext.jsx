import React, { createContext, useState } from 'react'

export const ClientsContext = createContext();

export const ClientsProvider = ({children}) => {
    const [clientsList, setClientsList] = useState(() => {
        const stored = localStorage.getItem('clients')
        return stored ? JSON.parse(stored) : []
      })

    return (
        <ClientsContext.Provider value={{clientsList, setClientsList}}>
            {children}
        </ClientsContext.Provider>
    )
};