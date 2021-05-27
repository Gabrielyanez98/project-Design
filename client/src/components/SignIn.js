import React, { useState }  from 'react';
import axios from 'axios';

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
    const [error, setError] = useState(null);
    

    const handleChange = e => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value          
        }) 
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(form.name === "" || form.surname === "" || form.phone === "" || form.gmail === "" || form.place === "" || form.user === "" || form.password === "" || form.bankData === "" || form.photo === ""){
            setError("Todos los campos son obligatorios");
            return
        }
        
        
        await axios.post('http://localhost:5000/api/auth/signin', form)
                .then(res => console.log(res))
                .catch(err => console.error(err))
        
        
    }



    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" 
                value={form.name} 
                onChange = {handleChange}/>
                <br/>

                <label htmlFor="surname">Apellidos</label>
                <input  type="text" name="surname" value={form.surname} onChange={handleChange}/>
                <br/>

                <label htmlFor="phone">Teléfono</label>
                <input  type="text" 
                name="phone" 
                value={form.phone} onChange={handleChange}/>
                <br/>

                <label htmlFor="gmail">Gmail</label>
                <input  type="gmail" 
                name="gmail" value={form.gmail} onChange={handleChange}/>
                <br/>

                <label htmlFor="place">Residencia</label>
                <input  type="text" name="place" value={form.place} 
                onChange={handleChange}/>
                <br/>

                <label htmlFor="password">Contraseña</label>
                <input  type="password" name="password" value={form.password} onChange={handleChange}/>
                <br/>

                <label htmlFor="bankData">Datos bancarios</label>
                <input  type="text" 
                name="bankData" 
                value={form.bankData} 
                onChange={handleChange}/>
                <br/>

                <label htmlFor="photo">foto</label>
                <input  type="file" name="photo" value={form.photo} onChange={handleChange}/>
                <br/>
                <input type="submit" value="Enviar"/>

                {
                error != null ? (
                    <div>{error} </div>
                ): (
                    <div></div>
                )
            }
                
            </form>
        </div>
    )
}

export default SignIn
