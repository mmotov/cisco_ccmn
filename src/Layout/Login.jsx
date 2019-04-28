import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios/index';
import config from '../config.js'

// matrerial ui and css
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import '../css/Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      presenceUname: "",
      presencePass: "",
      locationUname: "",
      locationPass: ""
    };
  }

  handleChange(event) {
    if ("presenceUname" === event.target.name){
      this.setState({ presenceUname:  event.target.value})
    } else if ("presencePass" === event.target.name){
      this.setState({ presencePass:  event.target.value})
    } else if ("locationUname" === event.target.name){
      this.setState({ locationUname:  event.target.value})
    } else if ("locationPass" === event.target.name){
      this.setState({ locationPass:  event.target.value})
    }
  }

  async componentWillUnmount() {
    try{
      let url = config.presence + 'api/config/v1/sites';
      let header = (JSON.parse(localStorage.getItem('cisco_auth'))).presense
      let res = await axios.get(config.presence + 'api/config/v1/sites', {
              headers: {
                  Authorization: header
              }
          });
      localStorage.setItem('siteId', JSON.stringify({
        id: res.data[0].aesUId,
      }));
    } catch (error){
      if (error.response.status == 401){
        localStorage.removeItem('cisco_auth');
        this.props.history.push("/login");
      }
    }
  }

 handleSubmit() {
    localStorage.setItem('cisco_auth', JSON.stringify({
      presense: "Base " + btoa(this.state.presenceUname + ":" + this.state.presencePass),
      location: "Base " + btoa(this.state.locationUname + ":" + this.state.locationPass),
    }));
  }

  render() {
    if (localStorage.getItem('cisco_auth')){
      return (<Redirect to='/' />);
    }
    return (
      <div className="LoginWrapper">
        <div className="Main">
          <CssBaseline />
          <Paper className="Paper">
            <Typography component="h1" variant="h5">
              Credention
            </Typography>

              <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="InerBox">
                  <FormLabel component="legend">Cisco_CMX_Locate</FormLabel>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Username</InputLabel>
                  <Input required={true} name="locationUname" autoComplete="text" autoFocus onChange={this.handleChange.bind(this)} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input required={true} name="locationPass" type="password"  autoComplete="current-password" onChange={this.handleChange.bind(this)} />
                </FormControl>

            </div>
            <div className="InerBox">
            <FormLabel component="legend">Cisco_CMX_Presence</FormLabel>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">Username</InputLabel>
                <Input required={true} name="presenceUname" autoComplete="text" autoFocus onChange={this.handleChange.bind(this)} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input required={true} name="presencePass" type="password" autoComplete="current-password" onChange={this.handleChange.bind(this)} />
              </FormControl>
              </div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="Submit"
                type="submit"
                >
                Submit
              </Button>
            </form>


          </Paper>
      </div>
  </div>
    );
  }
}

export default Login;
