import React from 'react'

function Register(props) {
  return (
    <>
      <form className='loginForm'>
        <div className='initialMsg'>
          <div className='enter'>
            Registre-se
          </div>
          <div className='insert'>
            Insira suas credenciais aqui
          </div>
        </div>

        <label>Seu nome</label>
        <input type="text" />

        <label>Seu email</label>
        <input type="text" />

        <label>Sua senha</label>
        <input type="password" />

        <label>Confirme sua senha</label>
        <input type="text" />

        <button style={{backgroundColor: '#24B468'}}>Registrar</button>

        <div className='registerLink'>
          Já possui uma conta? <span onClick={() => props.setRegister(false)}>Faça o login</span>
        </div>
      </form>
    </>
  )
}

export default Register
