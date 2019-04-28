import React, { Component } from 'react';
import axios from 'axios/index';
import config from '../config.js';
import Grid from '@material-ui/core/Grid';
import MenuListComposition from './MenuListComposition.jsx'

class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      floorList : [],
      campusName : [],
      buildName : [],
      count : 0
    }
  }

  async componentWillMount(){
    try {
      let url = config.location + 'api/config/v1/maps/count';
      let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
      let res = await axios.get(url, {
              headers: {
                  Authorization: header
              }
          });
      let upper = this;
      // console.log (res.data.totalBuildings + res.data.totalCampuses + res.data.totalFloors)
      this.setState({ count: res.data.totalBuildings + res.data.totalCampuses + res.data.totalFloors })
      res.data.campusCounts.map( (item) => {
        upper.setState(prevState => ({
          campusName: [...prevState.campusName, item.campusName]
        }))
        item.buildingCounts.map( item => {
          upper.setState(prevState => ({
            buildName: [...prevState.buildName, item.buildingName]
          }))
          item.floorCounts.map( item => {
            upper.setState(prevState => ({
              floorList: [...prevState.floorList, item.floorName]
            }))
          })
        })
      });
    } catch (error){
      console.log(error)
    }
  }

  render() {
    if (this.state.count !== (this.state.floorList.length
                              + this.state.campusName.length
                              + this.state.campusName.length)){
      return (<div></div>);
    }
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            >
            <Grid item xs={2}>
              <MenuListComposition name={this.state.campusName} title="Campus List" />
              </Grid>
              <Grid item xs={2}>
              <MenuListComposition name={this.state.buildName} title="Bulding List" />
              </Grid>
              <Grid item xs={2}>
              <MenuListComposition name={this.state.floorList} title="Floor List" />
          </Grid>
        </Grid>
    );
  }
}

export default Map;
