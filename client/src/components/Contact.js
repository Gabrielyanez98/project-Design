import React, { useState } from 'react';
import axios from 'axios';

const initialForm = {
    gmail: "",
    phone: "",
    textArea: ""
}

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(null);
    const [messageConfirm, setMessageConfirm] = useState('')

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.gmail === "" || form.phone === "" || form.textArea === "") {
            setError("Todos los campos son obligatorios");
            setMessageConfirm('');
            return
        }

        await axios.post('http://localhost:5000/api/contact/new_contact', form)
            .then(res => console.log(res))
            .catch(err => console.error(err))

        console.log(form)
        setForm(initialForm)
        setMessageConfirm("Mensaje recibido, gracias por contactar con nosotros, pronto recibirá una respuesta")

    }


    return (
        <div>

            <h2>Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="gmail" className="form-label">Gmail </label>
                    <input type="text"
                        className="form-control"
                        placeholder="ejemplo@ejemplo.com"
                        name="gmail"
                        value={form.gmail}
                        onChange={handleChange}
                    />

                    <br />
                    <label htmlFor="phone" className="form-label">Teléfono
                <input type="text"
                            className="form-control"
                            placeholder="+34 693748392"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <br />

                    <label htmlFor="textArea">Déjanos un comentario
                <textarea
                            name="textArea"
                            value={form.textArea}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <br />

                    <label htmlFor="legal" className="form-check-label">Acepto términos y condiciones
                <input type="checkbox" id="legal" name="legal" />
                    </label>
                    <br />
                    <input type="submit" value="Enviar" className="btn btn-primary" />
                </div>
            </form>
            <br />

            <p>{messageConfirm}</p>
            <br />
            {
                error != null ? (
                    <div>{error} </div>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}

export default Contact


