import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import sol from "./sol.jpg";
//import fotoPrueba from "./fotoPrueba.png";

//archivo webpack cargar fotos: include: SRC, use: [{loader: 'file-loader' }]
//import './Styles.css';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [seleccionado, setSeleccionado] = useState('');
    const [shoppingCart, setShoppingCart] = useState([]);
    const [photos, setPhotos] = useState('');
    const [images, setImages] = useState([]);
    const [fallback, setFallback] = useState('');
    const [mapea, setMapea]= useState(0);

    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:5000/login', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            });
            console.log(response.data)
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    /*const uploadHandler= (e) =>{
        const data = new FormData();
        data.append('name', e.target.files[0]);
        console.log(e.target.files)
        axios.post('http://localhost:5000/api/shopper/nuevo-shopper', data)
          .then((res) => {
            setPhotos({ photos: [res.data, ...photos] });
            console.log(res)
          });
    }
    
        LE PONGO EL VALOR DEL OBJETO FORM DEL COMPONENET ADD PRODCT Y AQUÍ LEHAGO UN GET
    */


    useEffect(async () => {
        /*
                try{
                    const res = await axios.get("http://localhost:5000/api/producto");
                    res => res.json()
                    setProducts(json)
                }catch(err){
                    console.error(err)
                }
                */




        let url = "http://localhost:5000/api/producto";
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);

                setProducts(json);
            }, (error) => {

                console.log(error);
            })

    }, []);


    useEffect(async () => {
        try {
            const res = await axios.get("http://localhost:5000/upload");
            if (!res.data.files) {
                setFallback(res.data.msg);
                return;
            } else {
                setImages(res.data.files)
            }
        } catch (err) {
            console.log(err.message);
        }
    }, []);
    console.log(images)

    const onChangeValue = (e) => {
        setSeleccionado(e.target.value);
    }
    console.log(seleccionado)

    const addToCart = () => {
        setShoppingCart([...shoppingCart, products])
    }

    const configureImage = image => {
        let devolver = "http://localhost:5000/uploads/" + image
        console.log(devolver)
        return devolver
    }
    console.log(seleccionado);

    
    let miArray=  [1,0,3]
    console.log(miArray[0+2])
    return (
        <div>

            <h2>{props.data}</h2>
            {/*<input type="file" name="name" onChange={uploadHandler}/>*/}
            <h1 className="miColor">Productos</h1>
            <div className="container">
                <div className="row">

                    {/*Show products selected */}
                    <form className="col-4" onChange={onChangeValue}>
                        <h1>Selects para ver productos clasificados</h1>
                        <input type="radio" value="" name="typeOfProducts" />
                        <label>Todos</label>
                        <br />
                        <input type="radio" value="madera" name="typeOfProducts" />
                        <label>Madera</label>
                        <br />
                        <input type="radio" value="arcilla" name="typeOfProducts" />
                        <label>Arcilla</label>
                        <br />
                        <input type="radio" value="ropa" name="typeOfProducts" />
                        <label>Ropa</label>
                        <br />
                        <input type="radio" value="manualidades" name="typeOfProducts" />
                        <label>Diferentes manualidades</label>
                        <br />
                        <input type="radio" value="decoracionHogar" name="typeOfProducts" />
                        <label>Decoración del hogar</label>
                        <br />
                        <input type="radio" value="otros" name="typeOfProducts" />
                        <label>Otros</label>
                        <br />
                    </form>
                    <section className="col-8">
                        <h2>Productos que vienen de la api</h2>
                        <section className="row">
                       
                            { 
                                /* Products render for all viewers */
                                products.filter(prod => {
                                    return prod.productType.includes(seleccionado);
                                })
                                    .map(product => (
                                        
                                        <div key={product._id} className="card col-4" >
                                            { seleccionado ==""&&
                                                images.map(image => (
                                                    <img className="card-img-top" src={configureImage(image)} key={image} />
                                                    
                                                ))
                                                
                                                
                                            }
                                            
                                            <div className="card-body">
                                                <h5 className="card-title">{product.nameProduct}</h5>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Tipo de producto: {product.productType}</li>
                                                    <li className="list-group-item">Precio: {product.price}</li>
                                                    <li className="list-group-item">Localización: {product.place}</li>
                                                </ul>
                                                <button

                                                    className="btn btn-primary">Añadir al carrito</button>
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
