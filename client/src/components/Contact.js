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
        console.log(form)
        await axios.post('http://localhost:5000/api/contact/new_contact', form)
            .then(res => console.log(res))
            .catch(err => console.error(err))

        console.log(form)
        setForm(initialForm)
        setMessageConfirm("Mensaje recibido, gracias por contactar con nosotros, pronto recibirá una respuesta")

    }


    return (
        <div className="container containerContact">


            <form onSubmit={handleSubmit} className="col-6">
                <h2>¡CONTÁCTANOS!</h2>
                <div className="mb-3">
                    <div className="form-group">
                        <label htmlFor="gmail" className="form-label">Correo electrónico
                            <input type="text"
                                className="form-control text"
                                placeholder="ejemplo@ejemplo.com"
                                name="gmail"
                                value={form.gmail}
                                onChange={handleChange}
                            /></label>
                    </div>
                    <br />

                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Teléfono
                            <input type="text"
                                className="form-control"
                                placeholder="+34 693748392"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <br />

                    <div className="form-group">
                        <label htmlFor="textArea">Déjanos un comentario si lo deseas
                            <textarea
                                name="textArea"
                                value={form.textArea}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </label>
                    </div>
                    <br />

                    <div className="form-group">
                    <label htmlFor="legal" className="form-check-label">Acepto términos y condiciones
                        <input type="checkbox" id="legal" name="legal" />
                    </label>
                    </div>
                    <br />
                    <input type="submit" value="Enviar" className="btn btn-primary" />
                </div>
            </form>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.4045774060705!2d2.167858415670518!3d41.38701940398029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f1602b4819%3A0x1eecc2af1c60d64b!2sPla%C3%A7a%20de%20Catalunya!5e0!3m2!1ses!2ses!4v1626617259154!5m2!1ses!2ses" width="600" height="450" loading="lazy" className="col-6"></iframe>
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


