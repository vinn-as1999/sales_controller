import React from 'react'
import { IoCheckmarkDone } from "react-icons/io5"
import '../../../styles/Messages.css'

function Message() {
  return (
    <>
      <main className='messageMain'>
        Usuário registrado com sucesso!
        <IoCheckmarkDone className='checkDone' />
      </main>
    </>
  )
}

export default Message
