

import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom"



function Login(props) {
  const [gmail, setGmail] = useState();
  const [password, setPassword] = useState();
  const [condicionalError, setCondicionalError] = useState(false);
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      gmail,
      password
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', payload)
      console.log(response.data);
      localStorage.setItem('token', response.data.token)
      props.history.push('/');  
    }
    catch (err) {    
      setError(err.response.data.message)
      setCondicionalError(true)
    }  
  }
    
  

  return (
    <div>
      <h1>Inicias sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gmail
          <input type="text" onChange={e => setGmail(e.target.value)} />
        </label>
        <br/>
        <label>
          Contraseña
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <br/>
        <div>
          <button type="submit">Submit</button>
        </div>
        {condicionalError && (<h1>{error}</h1>)}
      </form>
    </div>
  )
}

export default withRouter(Login);
