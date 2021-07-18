import React from 'react'
import {
    Link,
} from "react-router-dom";
import '../App.css';

const Navbar = ({ logout }) => {
    console.log("Hola")
    return (
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark  main-navigation">
                <div className="container-fluid " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 miNavbar ">

                        <li className="nav-item theNavbar">
                            <Link to="/" >Productos</Link>
                        </li>

                        <li className="nav-item theNavbar">
                            <Link to="/SignIn" >Inscríbete</Link>
                        </li>

                        {localStorage.getItem("token") ?

                            <li className="nav-item theNavbar" onClick={logout}>
                                Cerrar sesión
                            </li>

                            :
                            <li className="nav-item theNavbar">
                                <Link to="/Login" >Iniciar sesión</Link>
                            </li>
                        }

                        <li className="nav-item theNavbar">
                            <Link to="/Contact" className="">Contacto</Link>
                        </li>
                    </ul>
                </div>

                
            </nav>
    
            
        
    )
}

export default Navbar
