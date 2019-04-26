import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './Home/Home.jsx';
import Analytics from './Analytics/Analytics.jsx';
import Header from './Layout/Header.jsx';
import Login from './Layout/Login.jsx';
import Location from './Location/Location.jsx';

let Auth = (Component) => {
  if (!localStorage.getItem('cisco_auth')){
    return () => ( <Redirect to='/login' /> );
  }
  return () => ( <Component /> );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <Route path={"/"} component={Header} />
            <Route exact path={"/"} component={Home} />
            <Route path={"/analytics"} component={Analytics} />
            <Route path={"/location"} component={Location} />
            <Route path={"/login"} component={Login} />
      </BrowserRouter>
    );
  }
}

export default App;
