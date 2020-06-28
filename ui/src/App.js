import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import ResetPasswordPage from './pages/reset'
import ProfilePage from './pages/profile'
import ForgotPasswordPage from './pages/forgot_password'
import AuthContext from './context/auth_context'


class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    _id : null ,
    email: null,
    name: localStorage.getItem('name'),
    image: localStorage.getItem('image')
  }

  //check redirection for reset
  forgottenEmail = localStorage.getItem('forgottenEmail')

  login = (email, token, name , _id, tokenExpiry , image) => {

    if(!image) image ='profile.png'
   
    localStorage.setItem('token', token)
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    localStorage.setItem('_id' , _id)
    localStorage.setItem('image' , image)
    
    this.setState({ email: email, token: token, name: name , _id : _id , image : image})
  }

  updateImage = (image) => {
    localStorage.setItem('image' , image)
  }
  logout = () => {
    this.setState({ email: null, name: null, token: null , _id : null , image:null})
    localStorage.removeItem('token')
    localStorage.removeItem('forgottenEmail')
    localStorage.removeItem('_id')
  }
  render() {
    return (
      <AuthContext.Provider value={{
        _id : this.state._id,
        token: this.state.token,
        email: this.state.email,
        name: this.state.name,
        image : this.state.image,
        login: this.login,
        logout: this.logout
      }}>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/login" exact />
            {!this.state.token && <Redirect from="/profile" to="/login" exact />}
            {this.state.token && <Redirect from="/login" to="/profile" exact />}
            
            <Route path="/login" component={LoginPage} />
            <Route path="/sign_up" component={SignUpPage} />
            <Route path="/reset_password/:id" component={ResetPasswordPage} />
            <Route path="/profile" component={ProfilePage} />

            <Route path="/forgot_password" component={ForgotPasswordPage} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
