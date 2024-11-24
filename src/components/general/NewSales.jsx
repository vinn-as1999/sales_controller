import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../../../styles/NewSales.css'
import { ClientsContext } from '../contexts/ClientsContext'
import { ProductsContext } from '../contexts/ProductsContext'
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { SalesContext } from '../contexts/SalesContext'


function NewSales(props) {
  const {clients, setClients} = useContext(ClientsContext);
  const {products, setProducts, deleteProduct} = useContext(ProductsContext);
  const {user_id, username, url, sales, getSales, setSales, setHistory} = useContext(SalesContext);
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

      await deleteProduct(product.name, product.price, 1, category);
      await getSales();

    } catch (error) {
      console.log('Erro: ', error)
    }
  };


  async function removePending(pending) {
    try {
      const response = await fetch(`${url}/${pending}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.log("Erro: ", response, response.status)
      }

      const data = await response.json()
      
      console.log('Server response (removePending): ', data);
      await getSales();
      return
      
    } catch (error) {
      console.log("trycatch error: ", error)
    }
  };


  async function registerPayment(saleData) {
    // essa função deve remover a venda pendente da lista de pendencias
    saleData.day = props.getDate()
    saleData.hour = props.getHour()
    saleData.status = 'paid'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
      });

      if (!response.ok) {
        console.log('Erro: ', response, response.status)
        return
      }

      const data = await response.json()
      console.log(data)
      removePending(saleData._id)
      return

    } catch (error) {
      console.log('Trycatch error: ', error)
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

    fetchData(product, category, status);
  };


  useEffect(() => {console.log(sales)}, [sales])
  

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
                sales.length > 0 ? sales.map((sale, index) => sale.status === 'pending' && (
                  <tr key={index}>
                    <td>{sale.client}</td>
                    <td>{sale.product}</td>
                    <td>R$ {sale.price}</td>
                    <td>{sale.day}</td>
                    <td>
                      <IoCheckmarkDoneOutline 
                          className='check-status' 
                          onClick={() => registerPayment(sale)} />
                    </td>
                  </tr>
                )) : <div className="empty"><Empty /></div>  
              }
            </tbody>
        </table>
      </main>
    </>
  )
}

export default NewSales
