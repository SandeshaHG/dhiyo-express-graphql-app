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
import AuthContext from './../context/auth_context'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
class LoginPage extends Component{

    static contextType=AuthContext;

    state = {
        isLogin: true,
        dialogText : null,
        dialogTitle :null,
        email :null,
        userPassword :null ,
        name :null , 
        isSuccess : false
      };
    
    
      constructor(props) {
        super(props);
      }

  
    signInHandler = event => {

        event.preventDefault();
        const email = this.state.email
        const userPassword = this.state.userPassword
        
        if (email.trim().length === 0 || userPassword.trim().length === 0) {
          return;
        }
        var requestBody = {
            query: `
              query login($email: String!, $userPassword: String!) {
                login(email: $email, userPassword: $userPassword){
                  token
                  tokenExpiry
                  email
                  name
                }
              }
            `,
            variables: {
              email: email,
              userPassword:userPassword
            }
          };
          fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
              
              if (res.status !== 200 && res.status !== 201) {
                  console.log('error')
                  this.isSuccess=false;
                  this.isOpen=true;
                throw new Error('Failed!');
              }
             
              return res.json();
              
            }).then((data) =>{
              const loginData = data.data.login
              if(!loginData){
                this.state.dialogTitle= "Failed"
                this.state.dialogText = "Incorrect Password"
                this.setState({isOpen:true})

                throw new Error('Incorrect Password');
              }
              console.log(loginData)
              
              this.context.login(loginData.email , loginData.token , loginData.name , loginData.tokenExpiry)
              
            })
            .catch(err => {
                console.log(err);
              });
    }

    render(){
        const {classes} = this.props
        return(<Container component="main" maxWidth="xs" >
        <Box padding="2rem" borderBottom="3rem" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.signInHandler}>
            <Grid container spacing={2}>
              
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              Sign in
            </Button>
            <Grid container>
            <Grid item xs>
              <Link href="/forgot_password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="sign_up" variant="body2">
                {"Register"}
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
        
        <Button onClick={() => {this.setState({isOpen:false})}} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
            
      </Container>)
    }
}

export default withStyles(useStyles)(LoginPage)
