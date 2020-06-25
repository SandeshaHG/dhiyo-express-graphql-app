import React, {Component} from 'react'

class LoginPage extends Component{

    state = {
        isLogin: true
      };
    
    
      constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
      }

    submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
    
        if (email.trim().length === 0 || password.trim().length === 0) {
          return;
        }
        
        
    }

    forgotPasswordHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        
        var requestBody = {
            query: `
              query forgotPassword($email: String!) {
                forgotPassword(email: $email)
              }
            `,
            variables: {
              email: email,
            }
          };

          fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                  console.log('error')
                throw new Error('Failed!');
              }
              return res.json();
            })
            .catch(err => {
                console.log(err);
              });
    }

    render(){
        return(<form  onSubmit={this.submitHandler}>
        <div >
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div >
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div >
          <button type="submit">Submit</button>
        </div>
        <a href="" onClick={this.forgotPasswordHandler}>forgot password?</a>
      </form>)
    }
}

export default LoginPage
