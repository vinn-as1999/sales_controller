import React, { createContext, useEffect, useState } from 'react'


export const ClientsContext = createContext();

export const ClientsProvider = ({children}) => {
    const [clientsList, setClientsList] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_CLIENTS_URL}/${user_id}`;


    async function getClients() {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log("Erro ao buscar clientes")
                return
            }
    
            const data = await response.json();

            if ("error" in data) {
                console.log(data);
                return;
            }
            
            setClientsList(data);

        } catch (error) {
            console.log("Erro ao realizar a requisição")
        }
    };


    function getClientInfo(event) {
        const visibleClient = clientsList.find(client => client.contact === event)
        setSelectedClient(visibleClient)
    };
    

    useEffect(() => {
        getClients(user_id)

        return () => {}
    }, [token])

    return (
        <ClientsContext.Provider value={{clientsList, setClientsList, getClientInfo, selectedClient}}>
            {children}
        </ClientsContext.Provider>
    )
};