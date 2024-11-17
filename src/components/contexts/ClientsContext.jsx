import React, { createContext, useState } from 'react'

export const ClientsContext = createContext();

export const ClientsProvider = ({children}) => {
    const [clientsList, setClientsList] = useState(() => {
        const stored = localStorage.getItem('clients')
        return stored ? JSON.parse(stored) : []
      })
    const [selectedClient, setSelectedClient] = useState({})
    console.log(selectedClient)

    function getClientInfo(event) {
    const visibleClient = clientsList.find(client => client.client === event)
    setSelectedClient(visibleClient)
    };

    return (
        <ClientsContext.Provider value={{clientsList, setClientsList, getClientInfo, selectedClient}}>
            {children}
        </ClientsContext.Provider>
    )
};