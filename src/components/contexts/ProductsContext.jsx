import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const user_id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const url = import.meta.env.VITE_PRODUCTS_URL;
  const queryUrl = `${url}/${user_id}`

  // Fetch products from the server
  async function getProducts(query) {
    try {
      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.log('Erro ao buscar produtos: ', response.status);
        return;
      }
      const data = await response.json();
      if (data.products) {
        setProducts(data.products);
      } else {
        console.log('Nenhum produto encontrado', data);
      }
    } catch (error) {
      console.log('Erro ao buscar produtos: ', error);
    }
  }

  // Add a product
  async function addOneProduct(id, username, name, price, category) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          username: username,
          category,
          product: {
            name,
            price,
            quantity: 1,
          },
        }),
      });

      if (!response.ok) {
        console.log('Erro ao inserir dados: ', response.status);
        return;
      }

      await getProducts(queryUrl); // Update products list after addition
    } catch (error) {
      console.log('Erro ao inserir dados: ', error);
    }
  }

  // Delete a product
  async function deleteProduct(id, user, name, price, quantity, category) {
    console.log('nome', name, 'preco', price, 'qty', quantity)
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          username: user,
          category,
          product: {
            name,
            price,
            quantity,
          },
        }),
      });

      if (!response.ok) {
        console.log('Erro ao deletar o produto', response);
        return;
      }

      await getProducts(queryUrl); 
    } catch (error) {
      console.log('Erro ao deletar o produto: ', error);
    }
  }

  useEffect(() => {
    getProducts(queryUrl); 
  }, [token]);

  return (
    <ProductsContext.Provider value={{ products, getProducts, setProducts, addOneProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}