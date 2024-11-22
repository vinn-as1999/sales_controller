import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../../../styles/NewSales.css'
import { ClientsContext } from '../contexts/ClientsContext'
import { ProductsContext } from '../contexts/ProductsContext'
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { SalesContext } from '../contexts/SalesContext'


function NewSales(props) {
  const {clients, setClients} = useContext(ClientsContext);
  const {products, setProducts, deleteProduct} = useContext(ProductsContext);
  const {user_id, username, url, sales, getSales, setSales} = useContext(SalesContext);
  const [client, setClient] = useState('');
  const [prodName, setProdName] = useState('');


  async function fetchData(product, category, status) {
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
          day: props.getDate(),
          hour: props.getHour(),
          status: status
        })
      });

      const data = await response.json();
      if ("error" in data) {
        console.log(data)
        return
      }

      await deleteProduct(product.name, product.price, 1, category)
      console.log(data);

    } catch (error) {
      console.log('Erro: ', error)
    }
  };


  function registerSales(event, status) {
    // pega o nome do produto e pesquisa ele no contexto de produtos
    event.preventDefault();
    const existingProduct = products.find((prod) =>
      prod.products.some((val) => val.name === prodName)
    );

    const product = existingProduct
      ? existingProduct.products.find((item) => item.name === prodName)
      : undefined;

    if (!product) {
      // retornar erro
      return;
    }
    const category = existingProduct.category
    console.log(category)

    fetchData(product, category, status);
  };
  

  return (
    <>
      <main className='salesMain'>
        <section className='newSales'>
            <form style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
              onSubmit={(e)=>registerSales(e, 'pending')}>
              <div>
                <label>Cliente: </label>
                <input type="text" value={client} placeholder='ex: João' autoFocus={true} onChange={e => setClient(e.target.value)} />
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
                <th>Cliente</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {

              }
              {/* <tr onClick={() => props.setClients(true)}>
                <td>João</td>
                <td>Paçoca</td>
                <td>3,00</td>
                <td>23/10</td>
                <td>
                  <IoCheckmarkDoneOutline className='check-status' 
                      onClick={(e) => registerSales(e, 'paid')} />
                </td>
              </tr> */}
            </tbody>
        </table>
      </main>
    </>
  )
}

export default NewSales
