import React, { useContext, useState } from 'react'
import ProductsBttn from '../bttns/ProductsBttn.jsx'
import { ProductsContext } from '../contexts/ProductsContext.jsx'
import { BiSolidTrash } from "react-icons/bi"
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa"
import '../../../styles/Products.css'
import Empty from '../messages/Empty.jsx'

// PRONTO!

const user_id = localStorage.getItem('id');
const username = localStorage.getItem('username');
const url = import.meta.env.VITE_PRODUCTS_URL;
const queryUrl = import.meta.env.VITE_PRODUCTS_QUERY_URL + user_id

function Products(props) {
  const {products, setProducts} = useContext(ProductsContext)
  const [visibleCategories, setVisibleCategories] = useState({});

  // Alterna a visibilidade de uma categoria específica
  function toggleList(cat) {
    setVisibleCategories(prevState => ({
      ...prevState,
      [cat]: !prevState[cat] // alterna entre true e false
    }));
  }



  async function get_products() {
    try {
      const response = await fetch(queryUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) {
        console.log('erro ao buscar produtos: ', response.status)
        return
      }

      const data = await response.json()
      console.log("aqui os produtos: ", data.products);
      if (data.products) {
        setProducts(data.products);

      } else {
        console.log('Nenhum produto encontrado', data)
      }
    } catch (error) {
      console.log('Erro ao buscar produtos: ', error)
    }
  };


  async function addOneProduct(name, price, category) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          username: username,
          category: category,
          product: {
            name: name,
            price: price,
            quantity: 1
          }
        })
      });

      if (!response.ok) {
        console.log('error occurred: ', response.status)
        return
      }

    
      const data = await response.json();
      await get_products();
      console.log('Server response: ', data);

    } catch (error) {
      console.log('Erro ao inserir dados: ', error);
    }
  };


  async function deleteProduct(name, price, quantity, category) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id,
          username,
          category: category,
          product: {
            name: name,
            price: price,
            quantity: quantity
          }
        })
      });

      if (!response.ok) {
        console.log("Erro ao inserir dados dos produtos")
        return;
      }

      const data = await response.json();
      await get_products();
      console.log('Server response: ', data);

    } catch (error) {
      console.log('Error: ', error)
    }
  };


  return (
    <>
      <main className='prodMain'>
        {products.length > 0 ? products.map((cat) => (
          <>
            <h2 onClick={() => toggleList(cat.category)}>{cat.category}</h2>
            <ul style={{ display: visibleCategories[cat.category] ? 'block' : 'none' }}>
              {cat.products.map((prod, index) => (
                <li key={index} style={{display: 'flex', alignItems: 'center'}}>
                  <ProductsBttn
                    productName={prod.name}
                    productPrice={prod.price}
                    productQty={prod.quantity}
                  />
                  <FaChevronUp className='qtyBttn' color='#45CB85' title='+1'
                    onClick={() => addOneProduct(prod.name, prod.price, cat.category)} />
                  <FaChevronDown className='qtyBttn' color='#F34747' title='-1'
                    onClick={() => deleteProduct(prod.name, prod.price, 1, cat.category)} />
                  <BiSolidTrash className='qtyBttn' title='Remover produto'
                    onClick={() => deleteProduct(prod.name, prod.price, prod.quantity, cat.category)} />
                </li>
              ))}
            </ul>
          </>
        )) : 
        (
          <div className='empty'>
            <Empty />
          </div>
        )} 
      </main>
    </>
  );
}

export default Products;
