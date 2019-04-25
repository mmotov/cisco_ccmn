import React, { Component } from 'react';
import HourlyConnected  from './HourlyConnected';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props)
    return (
      <div>
      <HourlyConnected/>
      </div>
    );
  }
}

export default Home;
