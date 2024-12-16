import React, { useContext, useEffect, useState } from 'react'
import History from './History'
import '../../../styles/gInfo.css'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { SalesContext } from '../contexts/SalesContext'
import { ClientsContext } from '../contexts/ClientsContext'

function GeneralInfo() {
  const {sales, pending, setPending} = useContext(SalesContext);
  const {clientsList} = useContext(ClientsContext);
  const [value, setValue] = useState('');

  useEffect(() => {
    const getInformations = () => {
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
                    {String(sales.length).padStart(2, '0')}
                </div>
            </article>

            <article>
                <div className='artTitle'>
                    Total obtido (R$)
                </div>
                <div className='artValue'>
                    R$ {
                        sales.reduce((total, sale) => total + Number(sale.price), 0).toFixed(2)
                    }
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
