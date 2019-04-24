import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Home from './Home/Home.jsx';
import Analytics from './Analytics/Analytics.jsx';
import Header from './Layout/Header.jsx';
import Login from './Layout/Login.jsx';

let Auth = (Component) => {
  if (!localStorage.getItem('cisco_auth')){
    return () => ( <Redirect to='/login' /> );
  }
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
      <main>
        <Header />
        <Switch>
          <Route exact path='/' component={Auth(Home)} />
          <Route path='/analytics' component={Auth(Analytics)}/>
          <Route path='/login' component={Login}/>
        </ Switch>
      </main>
    );
  }
}

export default App;
