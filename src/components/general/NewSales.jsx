import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../../../styles/NewSales.css'
import { ClientsContext } from '../contexts/ClientsContext'
import { ProductsContext } from '../contexts/ProductsContext'

const url = import.meta.env.VITE_NEW_SALES_URL

function NewSales(props) {
  const {clients, setClients} = useContext(ClientsContext);
  const {products, setProducts} = useContext(ProductsContext);
  const [client, setClient] = useState('');
  const [prodName, setProdName] = useState('');

  async function fetchData(product) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id,
          username,
          client: client,
          product: product.name,
          price: product.price,
          quantity: 1,
          data: props.getDate()
        })
      });

      const data = await response.json()
    } catch (error) {
      console.log('Erro: ', error)
    }
  };

  const registerSales = useCallback(
    async function (event) {
      // pega o nome do produto e pesquisa ele no contexto de produtos
      event.preventDefault();
      const existingProduct = products.find((prod) =>
        prod.products.some((val) => val.name === prodName)
      );
  
      const product = existingProduct
        ? existingProduct.products.find((item) => item.name === prodName)
        : undefined;
  
      if (!product) {
        console.log('não existe produto');
        // retornar erro
        return;
      }
  
      console.log(product);
  
      await fetchData(product);
    },
    [products, prodName] // Adicione aqui quaisquer dependências externas
  );
  

  return (
    <>
      <main className='salesMain'>
        <section className='newSales'>
            <form style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onSubmit={registerSales}>
              <div>
                <label>Cliente: </label>
                <input type="text" placeholder='ex: João' autoFocus={true} />
              </div>
              <div>
                <label htmlFor="">Produto: </label>
                <input type="text" placeholder='ex: Paçoca' value={prodName} onChange={(e) => setProdName(e.target.value)} />
              </div>
              <div style={{display: 'flex'}}>
                <button>Salvar</button>
              </div>
            </form>
        </section>

        <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr onClick={() => props.setClients(true)}>
                <td>1</td>
                <td>João</td>
                <td>Paçoca</td>
                <td>3,00</td>
                <td>23/10</td>
              </tr> */}
            </tbody>
        </table>
      </main>
    </>
  )
}

export default NewSales
