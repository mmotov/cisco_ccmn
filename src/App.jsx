import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter} from 'react-router-dom';
import {browserHistory} from 'react-router'
import './App.css';
import Home from './Home/Home.jsx';
import Analytics from './Analytics/Analytics.jsx';
import Header from './Layout/Header.jsx';
import Login from './Layout/Login.jsx';

let Auth = (Component) => {
  if (!localStorage.getItem('cisco_auth')){
    return () => ( <Redirect to='/login' /> );
  }
  console.log(Component)
  return () => ( <Component /> );
  // localStorage.setItem('cisco_auth', JSON.stringify({
  //   password: btoa("123"),
  //   username: "lol"
  // }));
  // if (true){
  //   console.log(localStorage.getItem('cisco_auth'))
  //   return () => (
  //         <ComponentToDebug />
  //     );
  // }
  // console.log("lol")
  // return () => (
  //       <ComponentToDebug />
  //   );
};

class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
            <Route path={"/"} component={Header} />
            <Route exact path={"/"} component={Auth(Home)} />
            <Route path={"/analytics"} component={Auth(Analytics)} />
            <Route path={"/login"} component={Login} />
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
