import React from 'react'

function ProductsForm() {
  return (
    <>
      <main className='prodFormMain'>
        <div className='prodFormTitle'>
            <h1>Adicionar Produto</h1>
        </div>

        <section className='prodInfo'>
            <label>Nome do produto:</label>
            <input type="text" />

            <label>Categoria:</label>
            <input type="text" />

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
