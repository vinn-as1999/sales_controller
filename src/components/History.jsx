import React from 'react'
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { FaExclamation } from "react-icons/fa6"

function History() {
  return (
    <>
      <main className='histMain'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Produto</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>João</td>
                    <td>Paçoca</td>
                    <td>3,00</td>
                    <td>23/10</td>
                    <td>12:00</td>
                    <td><IoCheckmarkDoneSharp size={25} color='#85FF9E' /></td>
                </tr>
            </tbody>
            {

            }
        </table>
      </main>
    </>
  )
}

export default History
