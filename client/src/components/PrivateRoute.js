import { Route, Redirect } from 'react-router';
import {useState, useEffect} from 'react'
/*const PrivateRoute = (props) => {
    return (
        <Route exact = {props.exact} path={props.path} component={props.component}/>
    )
}*/

/*const PrivateRoute = (props) => {
    return (
        <Route {...props}/>
    )
}*/


const PrivateRoute = ({component: Component,...rest}) => {

    const [auth, setAuth] = useState(true)
    useEffect(()=> {
        if(localStorage.getItem("token")){
            setAuth(true)
        } else {
            setAuth(null)
        }
    }, [])
    
    console.log(auth)
    return (
        <Route {...rest}>
            {auth? <Component/> : <Redirect to="/login"/>}
        </Route>
    )
}


export default PrivateRoute
