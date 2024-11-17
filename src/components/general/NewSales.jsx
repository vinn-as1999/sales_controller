import React, { useContext } from 'react'
import '../../../styles/NewSales.css'
import { ClientsContext } from '../contexts/ClientsContext'
import { ProductsContext } from '../contexts/ProductsContext';

function NewSales(props) {
  const {clients, setClients} = useContext(ClientsContext);
  const {products, setProducts} = useContext(ProductsContext);

  async function registerSales() {
    // pega o nome do produto e pesquisa ele no contexto de produtos

      // se o produto não existir, retorna informando que não existe

    // após pegar as informações do produto, registra no banco de dados a nova venda feita e o status da venda (se já foi pago ou se ainda está pendente)

    // decrementa do banco de dados a quantidade vendida e atualiza o estoque
  }

  return (
    <>
      <main className='salesMain'>
        <section className='newSales'>
            <div>
              <label>Cliente: </label>
              <input type="text" placeholder='ex: João' autoFocus={true} />
            </div>

            <div>
              <label htmlFor="">Produto: </label>
              <input type="text" placeholder='ex: Paçoca' />
            </div>

            <div>
              <button>Salvar</button>
            </div>
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
