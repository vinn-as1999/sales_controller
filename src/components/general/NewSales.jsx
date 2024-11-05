import React from 'react'
import '../../../styles/NewSales.css'

function NewSales(props) {

  console.log(props)

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
              <tr onClick={() => props.setClients(true)}>
                  <td>1</td>
                  <td>João</td>
                  <td>Paçoca</td>
                  <td>3,00</td>
                  <td>23/10</td>
              </tr>
            </tbody>
            {

            }
        </table>
      </main>
    </>
  )
}

export default NewSales
