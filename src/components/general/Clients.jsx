import React, { useContext, useEffect } from 'react'
import '../../../styles/Clients.css'
import ClientsBttn from '../bttns/ClientsBttn'
import { ClientsContext } from '../contexts/ClientsContext';

function Clients(props) {
  const {clientsList, setClientsList} = useContext(ClientsContext)
  
  useEffect(() => {}, [clientsList]);


  return (
    <main className='clientsMain'>
      {clientsList.length > 0 ? (
        clientsList.map((value, index) => (
          <div key={index}>
            <ClientsBttn 
              getClientInfo={props.getClientInfo}
              setSelectedClient={props.setSelectedClient}
              setClients={props.setClients} 
              name={value.client}
              contact={value.contact} 
            />
          </div>
        ))
      ) : (
        <p>Nenhum cliente encontrado</p>
      )}
    </main>
  );
}

export default Clients
