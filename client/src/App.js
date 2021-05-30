import Navbar from './components/Navbar';
//import './components/Styles.css'
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import Products from './components/Products';
import Profile from './components/Profile';
import AddProduct from './components/AddProduct';
import SignIn from './components/SignIn';
import { 
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import React, { useState} from 'react';

/*Rutas privadas, errores, carrito de compras */
 


function App() {
    

    
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear("token");
        window.location.href = '/';
    }

   
    
      

  return (    
          <div>
              <Navbar logout={logout} />
              <Switch>
                  <Route exact path="/Contact" component={Contact}>
                      <Contact />
                  </Route>
                  <Route exact path="/Login" component={Login}>
                      <Login/>
                  </Route>
                  
                  <Route exact path="/" component={Products}>
                      <Products />
                  </Route>
                  <Route exact path="/Profile" component={Profile}>
                      <Profile />
                  </Route>
                  <Route exact path="/add_product" component={AddProduct}>
                      <AddProduct />
                  </Route>
                  <Route exact path="/SignIn" component={SignIn}>
                      <SignIn/>
                  </Route>
              </Switch>
              <Footer />

          </div>
      
  );
}

export default App;
