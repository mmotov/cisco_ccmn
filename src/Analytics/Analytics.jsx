import React, { Component } from 'react';
import * as axios  from 'axios';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], };
  }

  componentDidMount() {
    axios.get('https://cisco-presence.unit.ua/api/config/v1/version/image')
      .then((res) => {
      const data = res.data.cmx_rpm_versions;
      console.log(data)
      this.setState({ data });
      })
  }

  render() {
    return (
      <div>
      Analytics
      </div>
    );
  }
}

export default Analytics;
