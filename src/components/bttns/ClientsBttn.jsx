import React from 'react'
import { FiUser } from "react-icons/fi"
import { MdOutlineLocalPhone } from "react-icons/md"
import '../../../styles/Clients.css'

function ClientsBttn(props) {

  return (
    <>
      <main className='cliBttnMain' onClick={() => props.setClients(true)}>
        <article className='nameClient'>
            <div>
                <FiUser size={35} />
            </div>
            <div>
                João
            </div>
        </article>

        <article className='numberClient'>
            <div>
                <MdOutlineLocalPhone size={35} />
            </div>
            <div>
                (19) 9999-9999
            </div>
        </article>
      </main>
    </>
  ) 
}

export default ClientsBttn
