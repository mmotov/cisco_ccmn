import React, { Component } from 'react';
import * as axios  from 'axios';

import { visitorsToday } from '../requests/presence/visitorsToday';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], };
  }

  componentDidMount() {

    visitorsToday()
        .then((result) => {
          console.log(result);
        }).then(() => {});

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
