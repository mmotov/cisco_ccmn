import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, };
    console.log("lol")
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    // <main>
      // {this.props.children}
    // </main>
    console.log('headerProps: ', this.props);
    if (this.props.location.pathname == "/login"){
      return (<div></div>);
    }
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}
            centered >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Analytics" component={Link} to="/analytics" />
            <Tab label="Location" />
          </Tabs>
        </AppBar>
    </div>
    );
  }
}

export default Header;
