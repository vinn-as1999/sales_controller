import React, {useContext} from 'react'
import { ProductsContext } from '../contexts/ProductsContext'

function ProductsForm() {
  const {products, setProducts} = useContext(ProductsContext)

  return (
    <>
      <main className='prodFormMain'>
        <header className='prodFormTitle'>
            <h1>Adicionar Produto</h1>
        </header>

        <section className='prodInfo'>
            <label>Categoria:</label>
            <input type="text" />

            <label>Nome do produto:</label>
            <input type="text" autoFocus={true} />

            <label>Preço</label>
            <input type="number" />

            <label>Quantidade:</label>
            <input type="number" />

            <button>Salvar</button>
        </section>
      </main>
    </>
  )
}

export default ProductsForm
