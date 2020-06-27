import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../context/auth_context'
import ExitAppIcon from '@material-ui/icons/ExitToApp'
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';
import { Container, CardContent } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'


const useStyles = theme => ({

  root: {
    maxWidth: 245,
  },
  media: {
    paddingTop: '100%',
    margin: '5%'

  },
  title: {
    flex: 1
  },
  upload: {
    margin: '5%'
  }
});
class ProfilePage extends Component {

  static contextType = AuthContext;

  state = {
    showBrowse: false,
    showEdit: true,
    buttonText: "EDIT",
    currentImage: null
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
        userPassword: userPassword
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
        this.isSuccess = false;
        this.isOpen = true;
        throw new Error('Failed!');
      }

      return res.json();

    }).then((data) => {



    })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    const { classes } = this.props
    console.log(this.context)
    return (<>


      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title}>

          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => { this.context.logout() }}
            startIcon={<ExitAppIcon />}
          >
            Logout
      </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" >
        <Box padding="2rem" borderBottom="3rem" >
          <CssBaseline />
          <div className={classes.paper}>


            <Card >
              <CardHeader

                title="Sandesh"
                subheader="sandeshhg@gmail.com"
              />
              <CardMedia
                className={classes.media}
                image="data:image/jpeg;base64,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"
              />

              <CardContent>
                <Grid container justify="center">

                  <form >

                    {this.state.showBrowse && (
                      <>
                        <Grid container justify="center">
                          <Input
                            variant="contained"
                            color="secondary"
                            hidden="true"
                            justify="flex-end"
                            type="file"
                            inputProps={{ accept: 'image/*' }}
                            onChange={(e) => {
                              console.log(e.target.files[0])
                            }}
                            required
                            startIcon={<PublishIcon />}
                          >
                          </Input>
                        </Grid>
                        <Grid container justify="center">
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className={classes.upload}

                            startIcon={<PublishIcon />}
                          >
                            {this.state.buttonText}
                          </Button>
                        </Grid>
                      </>
                    )}

                    {this.state.showEdit && (
                      <Grid container justify="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          className={classes.upload}
                          onClick={(event) => {
                            event.preventDefault();
                            this.setState({ showBrowse: true, showEdit: false })
                            this.state.buttonText = "UPLOAD"
                          }}
                          startIcon={<EditIcon />}
                        >
                          {this.state.buttonText}
                        </Button>
                      </Grid>
                    )}






                  </form>
                </Grid>
              </CardContent>

            </Card>

          </div>
        </Box>


      </Container>

    </>)
  }
}

export default withStyles(useStyles)(ProfilePage)
