import React, {useContext, useState} from 'react'
import { ProductsContext } from '../contexts/ProductsContext'

const url = import.meta.env.VITE_PRODUCTS_URL

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

  /*
    products = {
      chocolates: [{
        name: alpino,
        valor: 8,
        quantidade: 5
      },
      {
        name: suflair,
        valor: 8,
        quantidade: 3
      }],

      doces: [{
        name: paçoca,
        valor: 3,
        quantidade: 10
      }]
    }
  
  */

  return (
    <>
      <main className='prodFormMain'>
        <header className='prodFormTitle'>
            <h1>Adicionar Produto</h1>
        </header>

        <section className='prodInfo'>
            <label>Categoria:</label>
            <input type="text" autoFocus={true} value={category} />

            <label>Nome do produto:</label>
            <input type="text" value={name} />

            <label>Preço</label>
            <input type="number" value={price} />

            <label>Quantidade:</label>
            <input type="number" value={quantity} />

            <button>Salvar</button>
        </section>
      </main>
    </>
  )
}

export default ProductsForm
