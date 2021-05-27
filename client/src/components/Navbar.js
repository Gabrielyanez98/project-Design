import React, { Component } from 'react'
import {
    Link,    
} from "react-router-dom";





const Navbar = ({logout}) => {
        
        return (
            
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">                      
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">                             

                                <li className="nav-item">
                                <Link to="/">Productos</Link>
                                </li>

                                <li className="nav-item">
                                <Link to="/Profile">Mi perfil</Link>
                                </li>
                                
                                <li className="nav-item">
                                <Link to="/SignIn">Sign in</Link>
                                </li>

                                <li className="nav-item">
                                <Link to="/Login">Login</Link>
                                </li>
                                

                                <li className="nav-item">
                                    <Link to="/Contact">Contacto</Link>
                                </li>
                                <li className="nav-item d-flex" onClick={logout}>
                                    Logout
                                </li>
                                
                            </ul>
                            <form className="d-flex">
                                <button className="btn btn-outline-success" type="submit">Imagen carrito de compra </button>
                            </form>
                        </div>
                    </nav>                
                </div>
         
        )
    
}

export default Navbar
