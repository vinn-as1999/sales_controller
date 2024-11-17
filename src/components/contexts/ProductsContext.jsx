import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

const user_id = localStorage.getItem('id');
const username = localStorage.getItem('username');
const url = import.meta.env.VITE_PRODUCTS_URL;
const queryUrl = import.meta.env.VITE_PRODUCTS_QUERY_URL + user_id;

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  async function getProducts() {
    try {
      const response = await fetch(queryUrl, {
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
  async function addOneProduct(name, price, category) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          username,
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

      await getProducts(); // Update products list after addition
    } catch (error) {
      console.log('Erro ao inserir dados: ', error);
    }
  }

  // Delete a product
  async function deleteProduct(name, price, quantity, category) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          username,
          category,
          product: {
            name,
            price,
            quantity,
          },
        }),
      });

      if (!response.ok) {
        console.log('Erro ao deletar o produto');
        return;
      }

      await getProducts(); // Update products list after deletion
    } catch (error) {
      console.log('Erro ao deletar o produto: ', error);
    }
  }

  useEffect(() => {
    getProducts(); // Fetch products on component mount
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, addOneProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}
