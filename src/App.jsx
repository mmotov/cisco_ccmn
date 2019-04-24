import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './Home/Home';
import Analytics from './Analytics/Analytics';
import Header from './Layout/Header';

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/analytics' component={Analytics}/>
        </Switch>
      </main>
    );
  }
}

export default App;
