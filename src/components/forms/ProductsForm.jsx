import React, {useContext, useEffect, useRef, useState} from 'react'
import { ProductsContext } from '../contexts/ProductsContext'

const userID = localStorage.getItem('id')
const username = localStorage.getItem('username')
const url = import.meta.env.VITE_PRODUCTS_URL
const queryUrl = import.meta.env.VITE_PRODUCTS_QUERY_URL + userID

function ProductsForm() {
  const {products, setProducts} = useContext(ProductsContext);
  const inputRef = useRef(null);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();


  async function getProducts() {
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

    try {
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


  async function addProducts(event) {
    event.preventDefault()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        username: username,
        category: category,
        product: {
          name: name,
          price: price,
          quantity: quantity && quantity.trim() !== '' ? quantity : 1
        }
      })
    });

    if (!response.ok) {
      console.log('error occurred: ', response.status)
      return
    }

    try {
      const data = await response.json();
      console.log('Server response: ', data);
      getProducts();

      setCategory('');
      setName('');
      setPrice('');
      setQuantity('');

      inputRef.current.focus();

    } catch (error) {
      console.log('Erro ao inserir dados: ', error);
    }
  };


  useEffect(() => {
    getProducts()

    if (quantity) {
      console.log('tem quantidade')
    }

  }, [quantity])

  return (
    <>
      <main className='prodFormMain'>
        <header className='prodFormTitle'>
            <h1>Adicionar Produto</h1>
        </header>

        <form className='prodInfo' onSubmit={addProducts}>
            <label>Categoria:</label>
            <input type="text" autoFocus={true} value={category} onChange={e => setCategory(e.target.value)} ref={inputRef} />

            <label>Nome do produto:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />

            <label>Preço</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

            <label>Quantidade:</label>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />

            <button type='submit' >
              Salvar
            </button>
        </form>
      </main>
    </>
  )
}

export default ProductsForm
