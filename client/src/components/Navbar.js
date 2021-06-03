import React from 'react'
import {
    Link,    
} from "react-router-dom";
import '../App.css';

const Navbar = ({logout}) => {

        return (      
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light miNavbar">                      
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">                             

                                <li className="nav-item ">
                                <Link to="/">Productos</Link>
                                </li>
                                
                                <li className="nav-item">
                                <Link to="/SignIn">Inscríbete</Link>
                                </li>

                                <li className="nav-item">
                                <Link to="/Login">Iniciar sesión</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link to="/Contact">Contacto</Link>
                                </li>
                                <li className="nav-item " onClick={logout}>
                                  Cerrar sesión
                                </li>
                            </ul>                          
                        </div>
                    </nav>                
                </div>   
        )  
}

export default Navbar
