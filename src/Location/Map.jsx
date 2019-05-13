import React, { Component } from 'react';
import axios from 'axios/index';
import config from '../config.js';
import Grid from '@material-ui/core/Grid';
import OutlinedTextFields from './OutlinedTextFields.jsx';
import ImgMediaCard from './ImgMediaCard.jsx';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      floorList: [],
      campusName: [],
      buildName: [],
      floorValue: "",
      open: false,
      vertical: 'bottom',
      horizontal: 'left',
      msg: "test"
    }
  }

  async componentDidMount() {
    try {
      let url = config.location + 'api/config/v1/maps';
      let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
      let res = await axios.get(url, {
        headers: {
          Authorization: header,
        }
      });
      let upper = this;
      res.data.campuses.map((item) => {
        upper.setState(prevState => ({
          campusName: [...prevState.campusName, item.name],
        }))
        item.buildingList.map(item => {
          upper.setState(prevState => ({
            buildName: [...prevState.buildName, item.name]
          }))
          item.floorList.map(item => {
            upper.setState(prevState => ({
              floorList: [...prevState.floorList, item.name],
              [item.name]: item.aesUidString
            }))
          })
        })
      });

    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  setFloor = (param) => {
    this.state.floorList.map(item => {
      if (this.state[item] === param) {
        this.setState({
          floor: item,
        })
      }
    })
  } 

  handleClick = (param) => {
    this.setState({ open: true, msg: param });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open, msg } = this.state;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <OutlinedTextFields name={this.state.campusName} title="campus" handleChange={this.handleChange} />
          <OutlinedTextFields name={this.state.buildName} title="bulding" handleChange={this.handleChange} />
          <OutlinedTextFields name={this.state.floorList} title="floor" handleChange={this.handleChange} value={this.state.floor} />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <ImgMediaCard
            imageSrc={"/" + this.state.campus + "/" + this.state.bulding + "/" + this.state.floor}
            floor={this.state[this.state.floor]}
            setFloor={this.setFloor}
            notification={this.handleClick}
          />
          <Button onClick={() => this.handleClick("lol")}>
          Top-Left
        </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            autoHideDuration={3000}
            onClick={this.handleClose}
            message={<span id="message-id">{ msg }</span>}
          />
          <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={this.handleClose}

            autoHideDuration={3000}
            onClick={this.handleClose}
            message={<span id="message-id">popopopo</span>}
          />
        </Grid>
      </div>
    );
  }
}

export default Map;
