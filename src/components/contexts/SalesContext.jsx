import React, {createContext, useContext, useEffect, useState} from "react";

export const SalesContext = createContext();

const user_id = localStorage.getItem('id')
const username = localStorage.getItem('username')
const url = `${import.meta.env.VITE_NEW_SALES_URL}/${user_id}`


export function SalesProvider({children}) {
    const [sales, setSales] = useState([]);
    const [history, setHistory] = useState([]);

    async function getSales() {
        try {
            const response = await fetch(url, {
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
            console.log('aqui temos o data: ', data.sales, "e o history", data.history)
            setSales(data.sales);
            setHistory(data.history);

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
                history,
                getSales,
                setSales,
                setHistory
            }}>
            {children}
        </SalesContext.Provider>
    )
};