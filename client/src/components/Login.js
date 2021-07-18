

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
      //props.history.push('/');  Con este método no se recarga la página y necesito que se recargue para el condicional render de la navbar
      window.location.href = '/'
    }
    catch (err) {
      setError(err.response.data.message)
      setCondicionalError(true)
    }
  }



  return (
    <div className="container containerContact">

      <form onSubmit={handleSubmit}>
        <h1>INICIAR SESIÓN</h1>
        <br />
        <div className="mb-3">
          <div className="form-group">
            <label htmlFor="gmail" className="form-label">
              Gmail
              <input type="text" className="form-control text" name="gmail" placeholder="ejemplo@ejemplo.com" onChange={e => setGmail(e.target.value)} />
            </label>
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="" className="form-label">
              Contraseña
              <input type="password" className="form-control text" onChange={e => setPassword(e.target.value)} />
            </label>
          </div>
          <br />

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          {condicionalError && (<h3>{error}</h3>)}
        </div>
      </form>
    </div>
  )
}

export default Login;
