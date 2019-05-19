import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter} from 'react-router-dom';
import './App.css';
import Analytics from './Analytics/Analytics.jsx';
import Header from './Layout/Header.jsx';
import Login from './Layout/Login.jsx';
import Map from './Location/Map.jsx';

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
                <Route exact path={"/"} component={Auth(Analytics)} />
                <Route exact path={"/location"} component={Auth(Map)} />
                <Route path={"/login"} component={Login} />
            </BrowserRouter>
        );
    }
}

export default App;
