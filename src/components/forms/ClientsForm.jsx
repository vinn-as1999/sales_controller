import React, { useEffect, useState } from 'react'
import '../../../styles/Clients.css'

const apiUrl = import.meta.env.VITE_ADD_CLIENTS_URL

function ClientsForm(props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [obs, setObs] = useState('');

  async function addClients() {
    if (!name.trim && !contact.trim() && !clientAddress.trim()) {
      return
    }
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('id'),
        client: name,
        contact: contact,
        address: clientAddress
      })
    });
    
    if (!response.ok) {
      console.log('Erro ao adicionar cliente', response);
      return
    }

    const data = await response.json();

    if (data[0].error) {
      console.log(data[0].error);
      return
    }

    props.setClientsList(prev => [
      ...prev, {
        client: data[0].client,
        contact: data[0].contact,
        address: data[0].address,
      }
    ]);
  };


  return (
    <>
      <main className='cliFormMain'>
        <form>
            <label>
                Nome:
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />

            <label>
                Contato:
            </label>
            <input type="number" value={contact} onChange={e => setContact(e.target.value)} />

            <label>
                Local/Endereço:
            </label>
            <input type="text" value={clientAddress} onChange={e => setClientAddress(e.target.value)} />

            <label>
                Observações:
            </label>
            <textarea value={obs} onChange={e => setObs(e.target.value)} />

            <button onClick={e => {addClients(); e.preventDefault()}}>
                Salvar
            </button>
        </form>
      </main>
    </>
  )
}

export default ClientsForm
