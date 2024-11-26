import React from 'react'

function HistoryForm(props) {
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
            <input type="number" value={props.month} onChange={(e) => setMonth(e.target.value)} />

            <label>
              Ano:
            </label>
            <input type="number" value={props.year} onChange={(e) => setYear(e.target.value)} />
        </form>
      </main>
    </>
  )
}

export default HistoryForm
