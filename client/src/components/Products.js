import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Products = () => {
 
    const [seleccionado, setSeleccionado] = useState('');
    const [images, setImages] = useState([]);
   
    useEffect( () => {
        const getAllFiles= async() => {
            try {
                const {data} = await axios.get("http://localhost:5000/upload");
                
                    setImages(data)
                
            } catch (err) {
                console.log(err.message);
            }
        }   
        getAllFiles()      
    }, []);
  
    const onChangeValue = (e) => {
        setSeleccionado(e.target.value);
    }

    const configureImage = image => {
        let devolver = "http://localhost:5000/uploads/" + image 
        return devolver
    }

    const newProduct = (e)=> {
        e.preventDefault();
        window.location.href = '/add_product';  
    }
    
    
    
    return (
        <div>       
            <div className="container">
                <div className="row">

                    {/*Show products selected */}
                    <form className="col-4" onChange={onChangeValue}>
                       
                        <p>Ver productos de: </p>
                        <br/>
                        <input type="radio" value="" name="typeOfProducts" />
                        <label>Todos</label>
                        <br/>
                        <input type="radio" value="madera" name="typeOfProducts" />
                        <label>Madera</label>
                        <br/>
                        <input type="radio" value="arcilla" name="typeOfProducts" />
                        <label>Arcilla</label>
                        <br/>
                        <input type="radio" value="ropa" name="typeOfProducts" />
                        <label>Ropa</label>
                        <br />
                        <input type="radio" value="manualidades" name="typeOfProducts" />
                        <label>Diferentes manualidades</label>
                        <br/>
                        <input type="radio" value="decoracionHogar" name="typeOfProducts" />
                        <label>Decoración del hogar</label>
                        <br />
                        <input type="radio" value="otros" name="typeOfProducts" />
                        <label>Otros</label>
                        <br/>
                        <br/>
                        <br/>
                        <button onClick={newProduct}>¿Ya estás registrado? ¡Entonces haz click para subir tu nuevo diseño!</button>
                    </form>
                    <section className="col-8">
                        <h2>Diseños</h2>
                        <section className="row">
                       
                            { 
                                /* Products render for all viewers with selects */
                                images.filter(prod => {
                                    return prod.productType.includes(seleccionado);
                                })
                                    .map(product => (                                      
                                        <div key={product._id} className="card col-4" >                                                                    
                                                    <img className="card-img-top" src={configureImage(product.file_name)} alt="Cargando imágenes..."key={product._id} />                                                                                                                                                                      
                                            <div className="card-body">
                                                <h5 className="card-title">{product.nameProduct}</h5>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Tipo de producto: {product.productType}</li>
                                                    <li className="list-group-item">Precio: {product.price}</li>
                                                    <li className="list-group-item">Localización: {product.place}</li>
                                                </ul>
                                                <button

                                                    className="btn btn-primary">Comprar producto</button>
                                            </div>
                                        </div>


                                    ))
                                    
                            }
                        </section>

                    </section>
                </div>
            </div>
        </div>
    )
}

export default Products
