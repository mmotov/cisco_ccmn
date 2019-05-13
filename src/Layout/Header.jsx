import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  logout(){
    localStorage.removeItem('cisco_auth');
    window.location.reload();
  }

  render() {
    if (this.props.location.pathname === "/login"){
      return (<div></div>);
    }
    return (
      <AppBar position="static">
        <Tabs value={this.state.value} onChange={this.handleChange}
          centered >
          <Tab label="Analytics" component={Link} to="/" />
          <Tab label="Location" component={Link} to="/location" />
          <Tab label="Log Out" onClick={this.logout.bind(this)} />
        </Tabs>
      </AppBar>
    );
  }
}

export default Header;
