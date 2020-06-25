import React from 'react';
import { BrowserRouter , Route , Redirect , Switch} from 'react-router-dom'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import ResetPasswordPage from './pages/reset'
import ProfilePage from './pages/profile'
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Redirect from="/" to="/login" exact/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/sign_up" component={SignUpPage}/>
      <Route path="/reset_password" component={ResetPasswordPage}/>
      <Route path="/profile" component={ProfilePage}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
