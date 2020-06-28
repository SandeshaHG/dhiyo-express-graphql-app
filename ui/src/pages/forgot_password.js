import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";

import {BrowserRouter, Redirect} from 'react-router-dom'


import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  
class ForgotPasswordPage extends Component{

    state = {
        isOpen : false,
        email : "",
        dialogText : null,
        dialogTitle : null
    }
      

    sendEmailHandler = event => {
        event.preventDefault();
        const email = this.state.email
    
        if (email.trim().length === 0) {
          return;
        }

        var requestBody = {
            query: `
              query forgotPassword($email: String!) {
                forgotPassword(email: $email){
                    email
                }
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
              this.state.dialogText = "There was some issue with the process. Please check if you have entered the right email address and try again";
              this.state.dialogTitle = "ERROR"
              this.setState({isOpen:true});
                throw new Error('Failed here!');
              }
              this.state.dialogText = "We have sent a reset password email to "+this.state.email+". Please click on the reset password link";
              this.state.dialogTitle = "SENT"
              this.setState({isOpen:true});
              localStorage.setItem('forgottenEmail' , email)
              
            })
            .catch(err => {
                
              });
        
        
    }     
    
  
    render(){
        const {classes} = this.props
       

  const handleClickOpen = () => {
    this.setState({isOpen:true})
  };

  const handleClose = () => {
    this.setState({isOpen:false})
  };


        return( <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
         
          <Typography component="h5" variant="h5">
            Forgot your password? Don't worry . Tell us the email address you registered with
          </Typography>
          <form className={classes.form} onSubmit = {this.sendEmailHandler}>
            <Grid container spacing={2}>
              
              
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange = {(e) => {
                      this.state.email = e.target.value
                  }}
                  

                />
              </Grid>
              <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
              
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              
            >
              SEND MAIL
            </Button>
          </form>
        </div>
        
    <Dialog
      open = {this.state.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {this.state.dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        
        <Button onClick={()=>{this.props.history.push('/')}} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
      </Container>)
    }
}

export default withStyles(useStyles)(ForgotPasswordPage)
