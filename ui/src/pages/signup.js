import React, {Component} from 'react'
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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


class SignUpPage extends Component{

    //current state
    state = {
        isLogin: true,
        dialogText : null,
        dialogTitle :null,
        email :null,
        userPassword :null ,
        name :null , 
        isSuccess : false

      };
    
      //constructor
      constructor(props) {
        super(props);
      }

      checkRedirect = () => {
          if(this.state.isSuccess){
              this.props.history.push('/')
          }
      }

      signUpHandler = event => {
        event.preventDefault();
        const email = this.state.email
        const name = this.state.name
        const userPassword = this.state.userPassword
    
        if (email.trim().length === 0) {
          return;
        }

        var requestBody = {
            query: `
              mutation signUp($name: String!, $email: String!, $userPassword: String!) {
                signUp(userInput: {name: $name, email: $email, userPassword: $userPassword}) {
                  name
                  email
                  userPassword
                }
              }
            `,

            variables: {
              email: email,
              name : name ,
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
                console.log(res)
              if (res.status !== 200 && res.status !== 201) {
              this.state.dialogText = "There was some issue with the process. Please check your details and try again";
              this.state.dialogTitle = "ERROR"
              console.log(this.state)
              this.setState({isOpen:true});
                throw new Error('Failed here!');
              }
              this.state.dialogText = "Welcome "+this.state.name+"!! Your registration is successful";
              this.state.dialogTitle = "SUCCESS"
              this.setState({isOpen:true});
          })
          .catch(err => {
            console.log(err);
          });     
      }     

    render(){
        const {classes} = this.props
        return(<Container component="main" maxWidth="xs" >
        <Box  padding="2rem">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={this.signUpHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange = {(e) => {
                      this.state.name = e.target.value
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  onChange = {(e) => {
                    this.state.email = e.target.value
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange = {(e) => {
                    this.state.userPassword = e.target.value
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            </Grid>
          </form>
        </div>
        </Box>
        <Dialog
          open = {this.state.isOpen}
          onClose={() => {this.setState({isOpen:false})}}
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
          <Button onClick={this.checkRedirect} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>)
    }
}

export default withStyles(useStyles)(SignUpPage)
