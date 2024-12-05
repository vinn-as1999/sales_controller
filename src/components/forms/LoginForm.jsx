import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Error from '../messages/Error';


function LoginForm(props) {
  const apiUrl = import.meta.env.VITE_LOGIN_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function goToPage(path) {
    navigate(path);
  }

  async function login() {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, password
        })
      });
  
      if (!response.ok) {
        console.log('Erro ao logar usuário', response)
        return
      }
  
      const data = await response.json();

      if (data[0].error) {
        setError(data[0].error)
        return
      }

      props.setIsToken(true);
      localStorage.setItem('id', data[0].id);
      localStorage.setItem('username', data[0].name);
      localStorage.setItem('token', data[0].token);

    } catch (error) {
      console.log('Erro de rede: ', error)
    }
  };

  useEffect(() => {
    if (props.isToken) {
      goToPage('/home')
    }
  }, [props.isToken]);

  useEffect(() => props.setRegister(false), [])

  return (
    <>
      <form className='loginForm'>
        <div className='initialMsg'>
          <div className='enter'>
            Entre em sua conta
          </div>
          <div className='insert'>
            Insira suas credenciais aqui
          </div>
        </div>

        <label>Email</label>
        <input type="text" value={email} placeholder='exemplo@email.com' autoFocus={true} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="">Senha</label>
        <input type="password" value={password} placeholder='Sua senha aqui' onChange={(e) => setPassword(e.target.value)} />

        <button onClick={(e) => {e.preventDefault(); login()}}>Entrar</button>
        
        <div className='registerLink'>
          Não possui uma conta? <span onClick={() => {props.setRegister(true); props.setWelcome(false)}}>Registre-se aqui</span>
        </div>
      </form>

      <div style={{marginLeft: '20px'}}>
        {error && <Error error={error} />}
      </div>
    </>
  )
}
export default LoginForm
