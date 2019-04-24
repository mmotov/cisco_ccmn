import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

  handleSubmit() {
    console.log("click")
  }

  render() {
    if (localStorage.getItem('cisco_auth')){
      return (<Redirect to='/' />);
    }
    return (
      <div className="Main">
      <CssBaseline />
      <Paper className="Paper">
        <Typography component="h1" variant="h5">
          Credention
        </Typography>
        <div className="InerBox">
        <FormLabel component="legend">Cisco_CMX_Locate</FormLabel>
        <form className="form">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Username</InputLabel>
            <Input name="presenceUname" autoComplete="text" autoFocus onChange={this.handleChange.bind(this)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="presencePass" type="password"  autoComplete="current-password" onChange={this.handleChange.bind(this)} />
          </FormControl>
        </form>
        </div>
      <hr />
        <div className="InerBox">
        <FormLabel component="legend">Cisco_CMX_Presence</FormLabel>
        <form className="form">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Username</InputLabel>
            <Input name="locationUname" autoComplete="text" autoFocus onChange={this.handleChange.bind(this)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="locationPass" type="password" autoComplete="current-password" onChange={this.handleChange.bind(this)} />
          </FormControl>
        </form>
      </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className="Submit"
          onClick={this.handleSubmit.bind()}
          >
          Submit
        </Button>
      </Paper>
    </div>
    );
  }
}

export default Login;
