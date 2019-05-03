import React, { Component } from 'react';
import axios from 'axios/index';
import config from '../config.js';
import Grid from '@material-ui/core/Grid';
import OutlinedTextFields from './OutlinedTextFields.jsx';
import ImgMediaCard from './ImgMediaCard.jsx';


class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      floorList : [],
      campusName : [],
      buildName : []
    }
  }

  async componentDidMount(){
    try {
      let url = config.location + 'api/config/v1/maps';
      let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
      let res = await axios.get(url, {
              headers: {
                  Authorization: header,
              }
          });
      let upper = this;
      res.data.campuses.map( (item) => {
        upper.setState(prevState => ({
          campusName: [...prevState.campusName, item.name],
        }))
        item.buildingList.map( item => {
          upper.setState(prevState => ({
            buildName: [...prevState.buildName, item.name]
          }))
          item.floorList.map( item => {
            upper.setState(prevState => ({
              floorList: [...prevState.floorList, item.name],
              [item.name]: item.aesUidString,
            }))
          })
        })
      });

    } catch (error){
      console.log(error)
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            >
              <OutlinedTextFields name={this.state.campusName} title="campus" handleChange={this.handleChange}  />
              <OutlinedTextFields name={this.state.buildName} title="bulding" handleChange={this.handleChange} />
              <OutlinedTextFields name={this.state.floorList} title="floor" handleChange={this.handleChange} />
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            >
            <ImgMediaCard imageSrc={"/" + this.state.campus + "/" + this.state.bulding + "/" + this.state.floor} floor={this.state[this.state.floor]} />

      </Grid>
      </div>
    );
  }
}

export default Map;
