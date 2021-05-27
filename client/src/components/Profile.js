import React, {useState, useEffect} from 'react'
import {
   
    Link,
    
} from "react-router-dom";


const Profile = () => {

    const [products, setProducts] = useState([]);
    const [author, setAuthor] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    

useEffect(()=> {
    let url = "http://localhost:3000/api/producto/";
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            //console.log(json);
            setIsLoaded(true);
            setProducts(json);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
        setIsLoaded(false)
        //Falta poner un spinner para isLoaded
}, [])

useEffect(()=> {
    let url = "http://localhost:3000/api/author/";
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            setIsLoaded(true);
            setAuthor(json);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
        setIsLoaded(false);
        //Falta poner un spinner para isLoaded
        
}, [])

    return (
        
        <div>
            <section>
                <img src="" alt="Foto del autor" />
                
                { 
                author.map(author => (
                    < ul key={author.id}>
                        <li>
                        <p>Nombre: </p>
                        {author.name}
                        </li>
                        <li >
                        <p>Apellidos </p>
                        {author.surname}
                        </li>
                        <li >
                           {author.phone}
                        </li>
                        <li >
                           {author.gmail}
                        </li>
                        <li >
                           {author.place}
                        </li>
                        <li >
                           {author.user}
                        </li>
                        <li >
                           {author.password}
                        </li>
                        <li >
                           {author.bankData}
                        </li>
                        <li>
                           {author.photo}
                        </li>

                      </ul>
                    ))}
                
                    
                <h5>Editar mi perfil</h5>
                
                <p>Nombre</p>
                <p>Apellidos</p>
                <p>Teléfono</p>
                <p>Gmail</p>
                <p>Localización</p>
                <p>Nombre de usuario</p>
                <p>Contraseña</p>
                <p>Datos bancarios</p>
                <p>Número de productos vendidos</p>
                <p>Puntuación</p>
                <p>Productos</p>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                           {product.nameProduct}
                        </li>
                    ))}
                </ul>
                <button>
                    <Link to="/add_product">Añadir nuevo producto</Link>
                </button>
            </section>
            
        </div>

    )
}


export default Profile

/* Cómo  hacer para que me salga solamente un solo autor con sus productos, sus productos están enlazados con un Populate*/ 

/* Para que cuando haga click en algo me lleve a una ruta determinada


import useHistory

const history= useHistory();
const handleClick = () => {
  history.push('/')
}

*/ 


/*import {useParams}
 
const {persona} = useParams();
"persona" es la persona escrita en el router path
luego haremos un fetch con /${id}
*/ 
