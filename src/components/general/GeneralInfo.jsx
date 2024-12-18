import React, { useContext, useEffect, useState } from 'react'
import '../../../styles/gInfo.css'
import { SalesContext } from '../contexts/SalesContext'
import { ClientsContext } from '../contexts/ClientsContext'

function GeneralInfo() {
  const id = localStorage.getItem('id');
  const url = import.meta.env.VITE_GOAL_URL;
  const {sales, pending, setPending, total, $total} = useContext(SalesContext);
  const {clientsList} = useContext(ClientsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(() => {
    const go = localStorage.getItem('goal');
    return go ? JSON.parse(go) : '00,00'
  });
  const [error, setError] = useState('');

  
  async function saveGoal() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: id,
                goal: goal
            })
        });

        if (!response.ok) {
            console.log(response, response.status);
            return
        }

        const data = await response.json();

        if ("error" in data) {
            setError(data.error);
            return
        }

        localStorage.setItem('goal', goal)
        setIsEditing(false);

    } catch (error) {
        console.log('Erro ao inserir meta mensal: ', error)
    }
  };

  
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
                    Total obtido (R$):
                </div>
                <div className='artValue'>
                    R$ { $total }
                </div>
            </article>

            {
                !isEditing 
                    ? (
                        <article onClick={() => setIsEditing(true)}>
                            <div className='artTitle'>
                                Projeção mensal (R$):
                            </div>
                            <div className='artValue'>
                                R$ {goal}
                            </div>
                        </article>
                      )
                    : (
                        <article className='input-container'>
                            <input type="number" 
                                className='goalInput'
                                placeholder='Sua meta mensal aqui'
                                onChange={(e) => setGoal(e.target.value)} />
                            <button className='goalBttn'
                                onClick={() => saveGoal()}>
                                Salvar
                            </button>
                        </article>
                      )
            }

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
