import React, {createContext, useContext, useEffect, useState} from "react";
import { ProductsContext } from "./ProductsContext.jsx";

export const SalesContext = createContext();

export function SalesProvider({children}) {
    const {products, deleteProduct} = useContext(ProductsContext)
    const [sales, setSales] = useState([]);
    const [history, setHistory] = useState([]);
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const url = import.meta.env.VITE_NEW_SALES_URL;
    const queryUrl = `${import.meta.env.VITE_NEW_SALES_URL}/${user_id}`;


    function getDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
    
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
        console.log('dados recebidos: ', id, user, product, category, client, status, qty)
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: id,
              username: user,
              client: client,
              product: product.name,
              price: product.price,
              quantity: qty,
              day: getDate(),
              hour: getHour(),
              status: status
            })
          });
    
          const data = await response.json();
          if ("error" in data) {
            return
          }
    
          await deleteProduct(id, user, product.name, product.price, qty, category);
          await getSales();
          console.log('Compra efetuada')
    
        } catch (error) {
          console.log('Erro: ', error)
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

            const data = await response.json()
            
            console.log('Server response (removePending): ', data);
            await getSales();
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
          return;
        }
        // Busca o produto dentro da categoria encontrada
        const product = existingCategory.products.find((product) => product.name === prodName);
      
        if (!product) {
          console.log("Erro: Produto não encontrado");
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
        getSales()
        return () => {}
    }, [token]);


    return (
        <SalesContext.Provider
            value={{
                sales,
                history,
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