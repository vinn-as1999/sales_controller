import React, {createContext, useContext, useEffect, useState} from "react";
import { ProductsContext } from "./ProductsContext.jsx";

export const SalesContext = createContext();

export function SalesProvider({children}) {
    const {products, deleteProduct} = useContext(ProductsContext);
    const [pending, setPending] = useState([]);
    const [sales, setSales] = useState([]);
    const [history, setHistory] = useState([]);
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const url = import.meta.env.VITE_NEW_SALES_URL;
    const queryUrl = `${import.meta.env.VITE_NEW_SALES_URL}/${user_id}`;

    const total = history.filter(data => data.status === 'paid');
    const $total = total.reduce((total, sale) => total + Number(sale.price), 0).toFixed(2);

    const [error, setError] = useState('');


    function getDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
    
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`
      };
    
    
      function getHour() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
    
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      };


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
            setSales(data.sales);
            setHistory(data.history);

        } catch (error) {
            console.log("Erro ao buscar vendas: ", error)
        }
    };

    async function fetchData(id, user, product, category, client, status, qty) {
        try {
            const saleData = {
                user_id: id,
                username: user,
                client,
                product: product.name,
                price: product.price,
                quantity: qty,
                day: getDate(),
                hour: getHour(),
                status,
            };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData),
            });
    
            const data = await response.json();
            if (data.error) return;
    
            setSales((prev) => [...prev, saleData]);
            setHistory((prev) => [...prev, saleData]);
    
            await deleteProduct(id, user, product.name, product.price, qty, category);
    
        } catch (error) {
            console.log('Erro: ', error);
        }
    };
    
    
    async function removePending(pending) {
        try {
            const response = await fetch(`${url}/${pending}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log("Erro: ", response, response.status)
            }
            
            setPending((prev) => prev.filter((p) => p._id !== pending));
            return
            
        } catch (error) {
            console.log("trycatch error: ", error)
        }
    };


    async function registerPayment(saleData) {
        // essa função deve remover a venda pendente da lista de pendencias
        saleData.day = getDate()
        saleData.hour = getHour()
        saleData.status = 'paid'

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleData)
            });

            if (!response.ok) {
                console.log('Erro: ', response, response.status)
                return
            }

            const data = await response.json()
            console.log("Server response: ", data)
            await getSales()
            removePending(saleData._id)
            return

        } catch (error) {
            console.log('Trycatch error: ', error)
        }
    };
    
    
    function registerSales(event, id, user, client, prodName, qty, status) {
        event.preventDefault();
      
        // Busca a categoria que contém o produto
        const existingCategory = products.find((category) => 
          category.products.some((product) => product.name === prodName)
        );
      
        // Se não encontrar a categoria, retorna erro
        if (!existingCategory) {
          console.log("Erro: Produto não encontrado em nenhuma categoria");
          setError("Produto não encontrado em nenhuma categoria");
          return;
        }
        // Busca o produto dentro da categoria encontrada
        const product = existingCategory.products.find((product) => product.name === prodName);
      
        if (!product) {
          console.log("Erro: Produto não encontrado");
          setError("Produto não encontrado");
          return;
        }
        // Chama a função para registrar a venda
        fetchData(
            id, 
            user, 
            product, 
            existingCategory.category, 
            client, 
            status, 
            qty
        );
    };

    useEffect(() => {
        if (token) getSales()
        return () => {}
    }, [token]);


    return (
        <SalesContext.Provider
            value={{
                sales,
                history,
                pending,
                total,
                $total,
                setPending,
                getSales,
                registerPayment,
                registerSales,
                setSales,
                setHistory
            }}>
            {children}
        </SalesContext.Provider>
    )
};