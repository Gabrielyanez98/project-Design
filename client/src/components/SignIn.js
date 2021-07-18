import React, { useState } from 'react';
import axios from 'axios';
import {

     Route

} from "react-router-dom";
import AddProduct from './AddProduct';

const SignIn = () => {

    const initialForm = {
        name: "",
        surname: "",
        phone: "",
        gmail: "",
        place: "",
        password: "",
        bankData: "",
        photo: ""
    }

    const [form, setForm] = useState(initialForm);
    const [condicionalError, setCondicionalError] = useState(false);
    const [error, setError] = useState('');
    const [messageConfirm, setMessageConfirm] = useState('')

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        /*if (form.name === "" || form.surname === "" || form.phone === "" || form.gmail === "" || form.place === "" || form.user === "" || form.password === "" || form.bankData === "" || form.photo === "") {
            setError("Todos los campos son obligatorios");
            return
        }*/
            try {
                await axios.post('http://localhost:5000/api/auth/signin', form)
            .then(res => console.log(res))
            } 
            catch (err) {
                console.log(err.response.data.message)
                setError(err.response.data.message)
                setCondicionalError(true)
                
            }

            setMessageConfirm("¡Ya estás registrado!")
    }

    
    let autorLogueado = localStorage.getItem("token")
    

    return (


        <div>
            {autorLogueado ?
                <Route><AddProduct/></Route>
                : 
                <section className="container containerContact">
                    
                    <form onSubmit={handleSubmit}>
                    <h1>¡REGÍSTRATE!</h1>
                    <br />
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text"  className="form-control text"  name="name"
                            value={form.name}
                            onChange={handleChange} />
                        <br />

                        <label 
                        htmlFor="surname" className="form-label">Apellidos</label>
                        <input type="text" 
                        className="form-control text" 
                        name="surname" 
                        value={form.surname} 
                        onChange={handleChange} />
                        <br />

                        <label 
                        htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="text"  className="form-control text" 
                            name="phone"
                            value={form.phone} onChange={handleChange} />
                        <br />

                        <label htmlFor="gmail">Gmail</label>
                        <input type="gmail"
                        className="form-control text" 
                            name="gmail" 
                            value={form.gmail} 
                            onChange={handleChange} />
                        <br />

                        <label htmlFor="place" className="form-label">Residencia</label>
                        <input type="text" 
                        className="form-control text" name="place" value={form.place}
                            
                        onChange={handleChange} />
                        <br />

                        <label 
                        htmlFor="password"
                        className="form-label">Contraseña</label>
                        <input type="password"  className="form-control text"  name="password" value={form.password} onChange={handleChange} />
                        <br />

                        <label 
                        htmlFor="bankData"
                        className="form-label">Datos bancarios</label>
                        <input type="text"
                        className="form-control text" 
                            name="bankData"
                            value={form.bankData}
                            onChange={handleChange} />
                        <br />

                        <label 
                        htmlFor="photo" className="form-label">foto</label>
                        <input 
                        type="file"   className="form-control text" name="photo" value={form.photo} onChange={handleChange} />
                        <br />
                        <input type="submit" value="Enviar" className="btn btn-primary"/>
                    </form>


                </section>}

                <br/>
                <p>{messageConfirm}</p>
                <br/>

                {condicionalError && (<h1>{error}</h1>)}
        </div>
    )
}

export default SignIn
