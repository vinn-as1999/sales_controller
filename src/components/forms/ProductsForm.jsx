import React, {useContext, useState} from 'react'
import { ProductsContext } from '../contexts/ProductsContext'

const userID = localStorage.getItem('id')
const username = localStorage.getItem('username')
const url = import.meta.env.VITE_PRODUCTS_URL
const queryUrl = import.meta.env.VITE_PRODUCTS_QUERY_URL + userID

function ProductsForm() {
  const {products, setProducts} = useContext(ProductsContext);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  // toda categoria será um novo documento no db

  /*
    doc: {
      user_id: 321351302132,
      username: 'marcelo',
      category: 'chocolates',
      products: [{
        name: 'alpino',
        valor: 8,
        quantidade: 5
      }]
    }

  
  */

  async function addProducts() {
    const response = await fetch(queryUrl, {
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
          quantity: quantity
        }
      })
    });

    if (!response.ok) {
      console.log('error occurred: ', response.status)
      return
    }

    try {
      const data = await response.json();
      console.log('aqui o data: ', data)

    } catch (error) {
      console.log('Erro ao inserir dados: ', error)
    }
  };

  return (
    <>
      <main className='prodFormMain'>
        <header className='prodFormTitle'>
            <h1>Adicionar Produto</h1>
        </header>

        <section className='prodInfo'>
            <label>Categoria:</label>
            <input type="text" autoFocus={true} value={category} onChange={e => setCategory(e.target.value)} />

            <label>Nome do produto:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />

            <label>Preço</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

            <label>Quantidade:</label>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />

            <button onClick={() => addProducts()}>
              Salvar
            </button>
        </section>
      </main>
    </>
  )
}

export default ProductsForm
