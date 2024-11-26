import React from 'react'

function HistoryForm() {
  return (
    <>
      <main>
        <form className='historyForm'>
            <label>
              Cliente:
            </label>
            <input type="text" />

            <label>
              Mês:
            </label>
            <input type="number" />

            <label>
              Ano:
            </label>
            <input type="number" />
        </form>
      </main>
    </>
  )
}

export default HistoryForm
