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
    file: null,
    display: localStorage.getItem('image')
  }

  

  updateImage = () => {
    const email = localStorage.getItem('email')
    const imageName = localStorage.getItem('image')
    
    var requestBody = {
      query: `
                mutation updateImage($email: String!, $imageName: String!) {
                  updateImage(email: $email, imageName: $imageName) {
                    email
                  }
                }
              `,

      variables: {
        email: email,
        imageName: imageName
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
        window.location.reload(false);
      })
      .catch(err => {
        
      });
  }

  uploadFile = event => {

    event.preventDefault();
    
    const email = localStorage.getItem('email')
    const _id = localStorage.getItem('_id')
    const file = this.state.file
    var form_data = new FormData();
    form_data.append('email', email)
    form_data.append('name_id', _id)
    form_data.append('myfile', file)


    /*var requestBody = {
      query: `
              
              mutation upload($email: String!, $file: Upload!) {
                upload(email: $email, file: $file) 
              }
              
            `,
      variables: {
        email: email,
        file: file,
        id : _id
      }
    };*/ 
    fetch('http://localhost:5000/uploadjavatpoint', {
      method: 'POST',
      body: form_data,
    }).then(response => response.json())
    .then(result => {
      
      localStorage.setItem('image' , result)
      this.setState({display : result})
      this.setState({showBrowse : false})
      this.setState({showEdit : true})
      this.setState({buttonText : "EDIT"})

      this.updateImage()
     
      
    })
    .catch(error => {
      
    });
  }
  render() {
    const { classes } = this.props
    
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
                title= {this.context.name}
                subheader={this.context.email}
              />
              <CardMedia
                className={classes.media}
                image = {"http://localhost:5000/" +localStorage.getItem('image')}
              />
            
              <CardContent>
                <Grid container justify="center">
                  <form onSubmit={this.uploadFile}>

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
                              this.setState({ file: e.target.files[0] })
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
                            UPLOAD
                          </Button>
                        </Grid>
                      </>
                    )}

                    {this.state.showEdit && (
                      <Grid container justify="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          
                          className={classes.upload}
                          onClick={(event) => {
                            event.preventDefault();
                            this.setState({ showBrowse: true, showEdit: false })
                            
                          }}
                          startIcon={<EditIcon />}
                        >
                          EDIT
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
