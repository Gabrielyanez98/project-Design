import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import SignIn from './components/SignIn';
import { 
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import React from 'react';
import PrivateRoute from './components/PrivateRoute';


function App() {
    
    
    const logout = (e) => {
        e.preventDefault()
        localStorage.clear("token");
        window.location.href = '/';    
    }

    let autorLogueado = localStorage.getItem("token")
    console.log(autorLogueado)

    
  return (    
          <div>
              <Navbar logout={logout}/>
              <Switch>
                  <Route exact path="/Contact" component={Contact}>
                      <Contact />
                  </Route>
                  <Route exact path="/Login" component={Login}>
                      <Login/>
                  </Route>
                  
                  <Route exact path="/" component={Products}>
                      <Products/>
                  </Route>
                  <Route exact path="/SignIn" component={SignIn}>
                      <SignIn/>
                  </Route>
                  <PrivateRoute exact path="/add_product" component={AddProduct}/>
              </Switch>
              <Footer />

          </div>
      
  );
}

export default App;
