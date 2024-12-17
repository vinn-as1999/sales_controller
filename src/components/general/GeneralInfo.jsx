import React, { useContext, useEffect, useState } from 'react'
import '../../../styles/gInfo.css'
import { SalesContext } from '../contexts/SalesContext'
import { ClientsContext } from '../contexts/ClientsContext'

function GeneralInfo() {
  const {sales, pending, setPending, total, $total} = useContext(SalesContext);
  const {clientsList} = useContext(ClientsContext);

  useEffect(() => {
    function getInformations() {
        const cliInfo = sales.flatMap((sale) => {
            const cliArr = clientsList.filter((client) => {
                return sale.client === client.client;
            });
    
            return cliArr;
        });
        setPending(cliInfo);
    };

    getInformations();

}, [sales, clientsList]);



  return (
    <>
      <main className='gInfoMain'>
        <header>
            <article>
                <div className='artTitle'>
                    Total (vendas):    
                </div>
                <div className='artValue'>
                    {String(total.length).padStart(2, '0')}
                </div>
            </article>

            <article>
                <div className='artTitle'>
                    Total obtido (R$)
                </div>
                <div className='artValue'>
                    R$ { $total }
                </div>
            </article>

            <article>
                <div className='artTitle'>
                    Projeção mensal
                </div>
                <div className='artValue'>
                    R$ 555,55
                </div>
            </article>
        </header>

        <section className='gITable'>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Local</th>
                        <th>Pendência</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pending.length > 0 ? pending.map((pending, index) => (
                            <tr key={index}>
                                <td>{pending.client}</td>
                                <td>{pending.contact}</td>
                                <td>{pending.address}</td>
                                <td>
                                    R$ {
                                        sales.find(sale => sale.client === pending.client)?.price || 'N/A'
                                    }
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
        </section>
      </main>
    </>
  )
}

export default GeneralInfo
