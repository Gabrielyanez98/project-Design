import React, { useState } from 'react';
import axios from 'axios';



const AddProduct = () => {

    const initialForm = {
        nameProduct: "",
        productType: "",
        price: "",
        place: "",
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
        console.log(form)
        e.preventDefault();

        if (form.nameProduct === "" || form.productType === "" || form.price === "" || form.place === "" || form.photo === "") {
            setError("Todos los campos son obligatorios");
            return
        }

        await axios.post('http://localhost:5000/api/contact/new_contact', form)
                .then(res => console.log(res))
                .catch(err => console.error(err))


        console.log(form)
    }

    return (
        <div>
            <h1>Añadir producto</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameProduct">Nombre del producto</label>
                <input type="text"
                    name="nameProduct"
                    value={form.nameProduct}
                    onChange={handleChange}
                />
                <br />
                <label>Selecciona el tipo de producto
                <select name="productType" value={form.productType} onChange={handleChange}>
                        <option name="madera" value="madera">Madera</option>
                        <option name="arcilla" value="arcilla">arcilla</option>
                        <option name="ropa" value="ropa">ropa</option>
                        <option name="manualidades" value="manualidades">manualidades</option>
                        <option name="decoracionHogar" value="decoracionHogar">Decoración del hogar</option>
                        <option name="otros" value="otros">Otros</option>
                    </select>
                </label>
                <br />

                <label htmlFor="price">Precio</label>
                <input type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="place">Localización del producto</label>
                <input type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="photo">Nombre del producto</label>
                <input type="file"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                />
                <br />
                <input type="submit" value="Enviar" />

                {
                    error != null ? (
                        <div>{error} </div>
                    ) : (
                        <div></div>
                    )
                }

            </form>
        </div>
    )
}

export default AddProduct
