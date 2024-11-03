import React from 'react'
import { FiUser } from "react-icons/fi"
import { MdOutlineLocalPhone } from "react-icons/md"
import '../../../styles/Clients.css'

function ClientsBttn(props) {

  function getClientInfo(event) {
    const item = localStorage.getItem('clients')
    const visibleClient = JSON.parse(item).find(client => client.client === event)
    props.setSelectedClient(visibleClient)
  };

  return (
    <>
      <main className='cliBttnMain' onClick={() => {props.setClients(true); getClientInfo(props.name)}}>
        <article className='nameClient'>
            <div>
                <FiUser size={35} />
            </div>
            <div>
                {props.name}
            </div>
        </article>

        <article className='numberClient'>
            <div>
                <MdOutlineLocalPhone size={35} />
            </div>
            <div>
                {props.contact}
            </div>
        </article>
      </main>
    </>
  ) 
}

export default ClientsBttn
