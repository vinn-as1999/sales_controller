import React, { useState } from 'react';
import ProductsBttn from './bttns/ProductsBttn';
import '../../styles/Products.css';

const prod = {
  Categoria1: [{
      Produto: 'pacoça',
      Preço: 3,
      Quantidade: 10
  }, {
      Produto: 'cocada',
      Preço: 3,
      Quantidade: 5
  }],
  Categoria2: [{
      Produto: 'chocolate',
      Preço: 8,
      Quantidade: 1
  }]
};

function Products() {
  // Armazenar o estado de visibilidade das listas por categoria
  const [visibleCategories, setVisibleCategories] = useState({});

  // Alterna a visibilidade de uma categoria específica
  function toggleList(cat) {
    setVisibleCategories(prevState => ({
      ...prevState,
      [cat]: !prevState[cat] // alterna entre true e false
    }));
  }

  return (
    <>
      <main className='prodMain'>
        {Object.keys(prod).map((cat) => (
          <div key={cat}>
            <h2 onClick={() => toggleList(cat)}>{cat}</h2>
            <ul style={{ display: visibleCategories[cat] ? 'block' : 'none' }}>
              {prod[cat].map((product, index) => (
                <li key={index}>
                  <ProductsBttn 
                    productName={product.Produto} 
                    productValue={product.Preço} 
                    productQty={product.Quantidade}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
}

export default Products;
