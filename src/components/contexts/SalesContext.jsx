import React, {createContext, useContext, useEffect, useState} from "react";

export const SalesContext = createContext();

const user_id = localStorage.getItem('id')
const username = localStorage.getItem('username')
const url = import.meta.env.VITE_NEW_SALES_URL
const queryUrl = import.meta.env.VITE_NEW_SALES_URL + `/${user_id}`

export function SalesProvider({children}) {
    const [sales, setSales] = useState([]);
    const [history, setHistory] = useState([]);

    async function getSales() {
        try {
            const response = await fetch(queryUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log(response, response.status)
                return;
            }

            const data = await response.json();
            console.log(data.data);
            setSales(data.data);
            setHistory(data.data);

        } catch (error) {
            console.log("Erro ao buscar vendas: ", error)
        }
    };

    useEffect(() => {
        getSales()
        return () => {}
    }, [])

    return (
        <SalesContext.Provider
            value={{
                sales,
                user_id,
                username,
                url,
                queryUrl,
                history,
                getSales,
                setSales,
                setHistory
            }}>
            {children}
        </SalesContext.Provider>
    )
};