import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from './../context/auth_context'

//Form Styling
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class ResetPasswordPage extends Component {

  static contextType = AuthContext
 

  //constructor
  constructor(props) {
    super(props);
  }

   //current state
   state = {
    isLogin: true,
    email: this.props.match.params.id,
    newPassword: null,
    confirmPassword: null,

  };


  resetPasswordHandler = event => {
    event.preventDefault();
    const email = this.state.email
    const userPassword = this.state.newPassword
    const confirmPassword = this.state.confirmPassword

    if (userPassword.trim().length === 0 || confirmPassword.trim().length === 0) {
      return;
    }
    if (userPassword != confirmPassword) {
      throw new Error('Passwords do not match')
    }
    var requestBody = {
      query: `
                mutation resetPassword($email: String!, $userPassword: String!) {
                  resetPassword(email: $email, userPassword: $userPassword) {
                    email
                  }
                }
              `,

      variables: {
        email: email,
        userPassword: userPassword
      }
    }

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        
        if (res.status !== 200 && res.status !== 201) {
          
          throw new Error('Failed here!');
        }
        this.props.history.push('/')

      })
      .catch(err => {
        
      });
  }

  render() {
    const { classes } = this.props
    return (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
            </Typography>
        <form className={classes.form} onSubmit={this.resetPasswordHandler} noValidate>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="New Password"
                type="password"
                id="password"
                onChange={(e) => {
                  this.state.newPassword = e.target.value
                }}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="password"
                onChange={(e) => {
                  this.state.confirmPassword = e.target.value
                }}

              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CONFIRM
              </Button>

        </form>
      </div>

    </Container>)
  }
}

export default withStyles(useStyles)(ResetPasswordPage)
