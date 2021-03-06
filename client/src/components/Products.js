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
        console.log(devolver)
        return devolver
    }

    const newProduct = (e)=> {
        e.preventDefault();
        window.location.href = '/add_product';  
    }
    
    
    
    return (
        <div>      
            <br />
            <br /> 
            <div className="container">
                <div className="row">

                    {/*Show products selected */}
                    <form className="col-3" onChange={onChangeValue}>
                       
                        
                        <input type="radio" value="" name="typeOfProducts" />
                        <label className="selector">&nbsp; Todos</label>
                        <br/>
                        <input type="radio" value="madera" name="typeOfProducts" />
                        <label className="selector">&nbsp; Madera</label>
                        <br/>
                        <input type="radio" value="arcilla" name="typeOfProducts" />
                        <label className="selector">&nbsp; Arcilla</label>
                        <br/>
                        <input type="radio" value="ropa" name="typeOfProducts" />
                        <label className="selector">&nbsp; Ropa</label>
                        <br />
                        <input type="radio" value="manualidades" name="typeOfProducts" />
                        <label className="selector">&nbsp; Diferentes manualidades</label>
                        <br/>
                        <input type="radio" value="decoracionHogar" name="typeOfProducts" />
                        <label className="selector">&nbsp; Decoraci??n del hogar</label>
                        <br />
                        <input type="radio" value="otros" name="typeOfProducts" />
                        <label className="selector">&nbsp; Otros</label>
                        <br/>
                        <br/>
                        <br/>
                        <button onClick={newProduct} className="btn btn-info buttonLogin">??Ya est??s registrado? ??Entonces haz click para subir tu nuevo dise??o!</button>
                    </form>
                    <section className="col-9">
                        
                        <section className="row">
                       
                            { 
                                /* Products render for all viewers with selects */
                                images.filter(prod => {
                                    return prod.productType.includes(seleccionado);
                                })
                                    .map(product => (                                      
                                        <div key={product._id} className="card col-4" >                                                                    
                                                    <img className="card-img-top" src={configureImage(product.file_name)} width="300" height="300" alt="Cargando im??genes..."key={product._id} />                                                                                                                                                                      
                                            <div className="card-body">
                                                <h5 className="card-title">{product.nameProduct}</h5>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Tipo de producto: {product.productType}</li>
                                                    <li className="list-group-item">Precio: {product.price}</li>
                                                    <li className="list-group-item">Localizaci??n: {product.place}</li>
                                                </ul>
                                                <button

                                                    className=" btn btn-success">Comprar producto</button>
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
