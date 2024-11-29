import React, { useEffect, useState } from 'react';
import Message from '../messages/Message';
import Error from '../messages/Error';

const apiUrl = import.meta.env.VITE_USERS_URL;

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPswd, setConfirmPswd] = useState('');
  const [message, setMessage] = useState(false);
  const [noFields, setNoFields] = useState(false);
  const [error, setError] = useState('');
  const [inputStyles, setInputStyles] = useState({
    name: {},
    email: {},
    password: {},
    confirmPswd: {}
  });

  async function registerUser(pswd, confPswd) {
    if (pswd !== confPswd) {
      console.log(`Passwords don't match`);
      setNoFields(true);
      return;
    }

    if (!name || !email || !pswd || !confPswd) {
      setNoFields(true);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        console.log('Error registering user', response);
        return;
      }

      const data = await response.json();
      if (data[0].error) {
        setNoFields(true);
        setError(data[0].error)
        return;
      }

      setMessage(true);
      // Reset form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPswd('');
      setInputStyles({ name: {}, email: {}, password: {}, confirmPswd: {} }); // Reset input styles
    } catch (error) {
      console.log('Network error: ', error);
    }
  }

  useEffect(() => {
    const newInputStyles = {
      name: noFields && !name ? { borderColor: 'red' } : {},
      email: noFields && !email ? { borderColor: 'red' } : {},
      password: noFields && !password ? { borderColor: 'red' } : {},
      confirmPswd: noFields && !confirmPswd ? { borderColor: 'red' } : {}
    };
    setInputStyles(newInputStyles);
  }, [noFields, name, email, password, confirmPswd]);

  return (
    <>
      <form className='registerForm' onSubmit={(e) => { e.preventDefault(); registerUser(password, confirmPswd); }}>
        <div className='initialMsg'>
          <div className='enter'>Registre-se</div>
          <div className='insert'>Insira suas credenciais aqui</div>
        </div>

        <label>Seu nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyles.name} />

        <label>Seu email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyles.email} />

        <label>Sua senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyles.password} />

        <label>Confirme sua senha</label>
        <input type="password" value={confirmPswd} onChange={(e) => setConfirmPswd(e.target.value)} style={inputStyles.confirmPswd} />

        <button className='registerBttn' type="submit">Registrar</button>

        <div className='registerLink'>
          Já possui uma conta? <span onClick={() => { props.setRegister(false); props.setWelcome(true) }}>Faça o login</span>
        </div>

        {message && <Message />}

        {error && <Error error={error} />}
      </form>
    </>
  );
}

export default Register;
