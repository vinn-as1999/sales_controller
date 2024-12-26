import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

function HistoryForm(props) {
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  function d(mm, yy) {
    const date = String(props.getDate(true));

    mm = mm || date.slice(0, 2);
    yy = yy || date.slice(-2);

    props.setDate_key(`${mm}/${yy}`);
    props.getHistByDate();

  };


  return (
    <>
      <main>
        <form className='historyForm'
          onSubmit={(e) => {e.preventDefault(); d(month, year)}}>
            <input type="text" 
              placeholder='Cliente'
              onChange={(e) => props.setName(e.target.value)} />
            <input
              type='number' 
              min={1}
              max={12}
              list='month-options'
              placeholder='Mês'
              value={month}
              onChange={(e) => setMonth(e.target.value)} />
            <input type="number" 
              placeholder='Ano'
              value={year}
              onChange={(e) => setYear(e.target.value)} />

            <datalist id="month-options">
              <option value="01">Janeiro</option>
              <option value="02">Fevereiro</option>
              <option value="03">Março</option>
              <option value="04">Abril</option>
              <option value="05">Maio</option>
              <option value="06">Junho</option>
              <option value="07">Julho</option>
              <option value="08">Agosto</option>
              <option value="09">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </datalist>

            <button className='hist-bttn' type='submit' >{<BiSearchAlt />}</button>
        </form>
      </main>
    </>
  )
}

export default HistoryForm
