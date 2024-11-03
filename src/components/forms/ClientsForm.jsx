import React, { useEffect, useState } from 'react'
import '../../../styles/Clients.css'

const apiUrl = import.meta.env.VITE_ADD_CLIENTS_URL

function ClientsForm(props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [obs, setObs] = useState('');

  async function addClients() {
    if (!name.trim || !contact.trim() || !clientAddress.trim()) {
      console.log('deu n')
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
        address: clientAddress,
        observations: obs
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

    const newClients = {
      client: data[0].client,
      contact: data[0].contact,
      address: data[0].address,
      observations: data[0].observations
    }

    props.setClientsList(prev => [...prev, newClients]);

    localStorage.setItem('clients', JSON.stringify(props.clientsList))

    setName('');
    setContact('');
    setClientAddress('');
    setObs('');
  };

  useEffect(() => localStorage.setItem('clients', JSON.stringify(props.clientsList)), [props.clientsList])

  return (
    <>
      <main className='cliFormMain'>
        <header>
          <h1>Registrar cliente</h1>
        </header>
        <form>
            <label>
                Nome:
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} autoFocus={true} />

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
