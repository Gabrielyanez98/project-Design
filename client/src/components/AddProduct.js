import React, { useState, useHistory } from 'react';
import axios from 'axios';



const AddProduct = (props) => {

    const initialForm = {
        nameProduct: "",
        productType: "",
        price: "",
        place: ""
    }

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(null);
    const [photos, setPhotos] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    };

    /*ATENCIÓN AQUÍ TENGO EL NOMBRE DEL ARCHIVO!*/ 
        //console.log(file.name)
   
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        })

    }

    /*const uploadHandler = (e)=> {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file);
        dataata.append("fileName", fileName);
        console.log(e.target.files)
        axios.post('http://localhost:5000/api/producto/nuevo-producto', data)
          .then((res) => {
            setPhotos({ photos: [res.data, ...photos] });
            console.log(res)
          });
    }*/
   
    const handleSubmit = async (e) => {
        console.log(form)
        e.preventDefault();
       

        if (form.nameProduct === "" || form.productType === "" || form.price === "" || form.place === "") {
            setError("Todos los campos son obligatorios");
            return
        }
        
            
        await axios.post('http://localhost:5000/api/producto/nuevo-producto', form)
                .then(res => console.log(res))
                .catch(err => console.error(err))

        const formData = new FormData();
        formData.append("file", file);
       
        await axios.post(
            "http://localhost:5000/api/photo/upload", formData)
            .then(res => console.log(res))
            .catch(err => console.error(err))
        
        console.log(formData)

        
        console.log(form)
    console.log(photos)
    window.location.href = '/';
        
    }

    return (
        <div>
            <h1>Añadir producto</h1>
            <form onSubmit={handleSubmit} action="/api/photo/upload" method="POST" encType="multipart/form-data">
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
