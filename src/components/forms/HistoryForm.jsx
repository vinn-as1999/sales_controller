import React from 'react'

function HistoryForm() {
  return (
    <>
      <main>
        <form className='historyForm'>
            <input type="text" placeholder='Cliente' />
            <input type="number" placeholder='Mês' />
            <input type="number" placeholder='Ano' />
        </form>
      </main>
    </>
  )
}

export default HistoryForm
