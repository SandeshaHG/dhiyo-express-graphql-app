import React , { Component } from 'react';
import { BrowserRouter , Route , Redirect , Switch} from 'react-router-dom'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import ResetPasswordPage from './pages/reset'
import ProfilePage from './pages/profile'
import ForgotPasswordPage from './pages/forgot_password'
import AuthContext from './context/auth_context'
class App extends Component {
  state = {
    token : localStorage.getItem('token'),
    email : null,
    name : localStorage.getItem('name')
  }

  //check redirection for reset
  forgottenEmail  = localStorage.getItem('forgottenEmail')

  login = (email , token , name, tokenExpiry) => {
    localStorage.setItem('token',token)
    localStorage.setItem('name',name)
    console.log('hey')
    this.setState({email : email , token : token , name : name})
  }
  logout = () => {
    this.setState({email : null , name : null , token : null})
    localStorage.removeItem('token')
    localStorage.removeItem('forgottenEmail')
  }
  render(){
    return (
      <AuthContext.Provider value={{
        token: this.state.token,
        email: this.state.email,
        name: this.state.name,
        login: this.login,
        logout: this.logout
      }}>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/login" exact/>
            {!this.state.token && <Redirect from="/profile" to="/login" exact/>}
            {this.state.token && <Redirect from="/login" to="/profile" exact/>}
            {!this.forgottenEmail && <Redirect from="/reset_password" to="/login" exact/>}
            <Route path="/login" component={LoginPage}/>
            <Route path="/sign_up" component={SignUpPage}/>
            <Route path="/reset_password" component={ResetPasswordPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/forgot_password" component={ForgotPasswordPage}/>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
