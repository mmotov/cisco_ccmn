import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import * as axios  from 'axios';
import HourlyConnected from "../Home/HourlyConnected";
import Header from "./Header";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], };
  }

  componentDidMount() {
    // axios.get('https://cisco-presence.unit.ua/api/config/v1/version/image')
    //   .then((res) => {
    //   const data = res.data.cmx_rpm_versions;
    //   console.log(data)
    //   this.setState({ data });
    //   })
  }

  render() {
    return (
        <div className={"wrapper-sm-24"}>
          <Grid container direction={"column"}>
            <Grid item xs={12} className={"wrapper-24"}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <HourlyConnected/>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default Analytics;
