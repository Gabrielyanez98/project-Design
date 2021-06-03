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
    const [messageConfirm, setMessageConfirm] = useState('');

    const saveFile = (e) => {
        setForm({
            ...form,
            photo: e.target.files[0]
        });
    }


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        })

    }   

    const handleSubmit =  (e) => {
        console.log(form)
        e.preventDefault();


        if (form.nameProduct === "" || form.productType === "" || form.price === "" || form.place === "") {
            setError("Todos los campos son obligatorios");
            setMessageConfirm('');
            return    
        }

        const formData = new FormData();

        formData.append("nameProduct", form.nameProduct);
        formData.append("productType", form.productType);
        formData.append("price", form.price);
        formData.append("place", form.place);
        formData.append("photo", form.photo);
         axios.post(
            "http://localhost:5000/api/photo/upload", formData)
            .then(res => console.log(res))
            .catch(err => console.error(err))

           setForm(initialForm)
           setMessageConfirm("Nuevo producto añadido")
           
    }

    return (
        <div>
            <h1>Añadir un nuevo producto</h1>
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
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
                    name="file"
                    onChange={saveFile}
                />
                <br />
                <input type="submit" value="Enviar" />
                <br/>
                <p>{messageConfirm}</p>
                <br/>
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
