import React from 'react'
import History from './History'
import '../../styles/gInfo.css'

function GeneralInfo() {
  return (
    <>
      <main className='gInfoMain'>
        <header>
            <article>
                <div className='artTitle'>
                    Total (vendas):    
                </div>
                <div className='artValue'>
                    55
                </div>
            </article>

            <article>
                <div className='artTitle'>
                    Total obtido (R$)
                </div>
                <div className='artValue'>
                    R$ 55,55
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

                    }
                </tbody>
            </table>
        </section>
      </main>
    </>
  )
}

export default GeneralInfo
