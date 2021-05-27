
/*rutas:
export const login = "/"
export const private = '/private'
import {login, private} from '';

return (
    <Browserouter>
      <Switch>
          <Route path={private} component = {nameComponent}/>
          <Route path={login} component = {nameComponent} exact/>
      </Switch>
    </Browserouter>
)
*/

//componente privateRoute
/*import useAuthContext

const privateRoute = ({component: Component, path:path, ...rest}) => {
   const {isAuthenticated} = useAuthContext();

   return (
       <Route
       {...rest}
       render = {props => (isAuthenticated ? <Component {...props}/> : <Redirect to {login} />)}
       />
   )
}*/

/*


*/