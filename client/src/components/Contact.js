
import React, { useState } from 'react';
import axios from 'axios';

const initialForm= {
    gmail: "",
    phone: "",
    textArea: ""
}
const Contact = () => {
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
        
        
        
        if(form.gmail === "" || form.phone === "" || form.textArea === ""){
      
            setError("Todos los campos son obligatorios");
            return
        }
           
         await axios.post('http://localhost:5000/api/contact/new_contact', form)
                .then(res => console.log(res))
                .catch(err => console.error(err))
                
        console.log(form)
        setForm('')   

    }


    return (
        <div>
           
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="gmail">Gmail
                <input type="text" placeholder="ejemplo@ejemplo.com"
                    name="gmail"
                   
                    value={form.gmail}
                    onChange={handleChange}
                />
                </label>         
                <br />

                <label htmlFor="phone">Teléfono
                <input type="text" placeholder="+34 693748392"
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
                />
                </label>
                <br />

                <label htmlFor="legal">Acepto términos y condiciones
                <input type="checkbox" id="legal"
                    name="legal"
                />
                </label>
                <br />

                <input type="submit" value="Enviar" />
            </form>
            {
                error != null ? (
                    <div>{error} </div>
                ): (
                    <div></div>
                )
            }
        </div>
    )
}

export default Contact


/*useEffect(()=> {
        let url = "https://pokeapi.co/api/v2/pokemon/";
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);
                json.results.forEach(
                    (el) => {
                        fetch(el.url)
                            .then((res) => res.json())
                            .then((json) => {
                                console.log(json);
                                let pokemon = {
                                    id: json.id,
                                    name: json.name,
                                    avatar: json.sprites.front_default
                                };

                                setPokemons((pokemons)=> [...pokemons, pokemon]);
                            });
                    });
            })
    }, [])*/


/*
functions{
    import uniqid from 'uniqid'

    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null)

    const addNombre= (e) => {
        e.preventDefault();
        if(!nombre.trim()){
            setError('Campo obligatorio')
            return
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
      setListaNombres([...listaNombres, nuevoNombre])
      setNombre('');
      setError(null)
    }

    const deleteNombre = (id) => {
         const nuevaArray = listaNombres.filter(item => item.id !== id)
         setListaNombres(nuevaArray)
    }

    const editar = (item) => {
        setModoEdicion(true);
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = (e) => {
        e.preventDefault
        const nuevoArray = listaNombres.map(item => item.id === id ? {id: id, tituloNombre: nombre}: item);
        setListaNombres(nuevoArray)
        setModoEdicion(false)
        setNombre('')
    }
}

return(
    <h2>Formulario</h2>

    <h2>Listado productos</h2>
    <ul className="list-group">
       {
           listaNombres.map(item => 
            <li key="{idem.id}">{item.tituloNombre}

            <button onClick={ () => {deleteNombre(item.id)}}>
                Borrar
            </button>

            <button onClick={ () => {editar(item)}}>
                Editar
            </button>
            </li>)
       }
    </ul>

    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group"
    value={nombre}>
    <input onChange={(e) => {setNombre(e.target.value)}} type="text"/>
    <input type="submit"
    value={modoEdicion ? 'Editar': 'Registrar nombre'}
    />
</form>
{
    error != null ? (
     <div className="">
     {error}
     </div>
    ):
    (
        <div></div>
    )
}
)*/

