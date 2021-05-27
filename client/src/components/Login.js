

import React, { useState, useHistory } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom"




/*COn axios: 
const response = await axios.post(baseUrl, credentials)
return response.data
 */
let errores = []

function Login(props) {
  const [gmail, setGmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  


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
      
      errores.push(2) 

      errores.push(err.response.data.message) 
      console.log(errores)

      setError(true)
    } 
  }

  return (
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Gmail</p>
          <input type="text" onChange={e => setGmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        {error && (<h1>{errores[1]}</h1>)}
      </form>
    </div>
  )
}

export default withRouter(Login);
