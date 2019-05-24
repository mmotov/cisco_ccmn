import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios/index';
import config from '../config.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import { Stage } from 'react-konva';
import windowSize from 'react-window-size';
import UsersLocation from './UsersLocation.jsx';
import Search from './Search.jsx';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: '1400px',
    height: '80vh',
    width: '90%',

  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%"
  }


});

class ImgMediaCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      floor: this.props.floor,
      info: []
    }
    this.myInput = React.createRef();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.floor && nextProps.campus && nextProps.build) {
      // Try rebuid by async request
      try {
        let url = config.location + "api/config/v1/maps/image" + nextProps.imageSrc;
        let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
        let res = await axios.get(url, {
          headers: {
            Authorization: header,
          },
          responseType: 'arraybuffer'
        });
        let tmp = "data:image/png;base64," + new Buffer(res.data).toString('base64');
        this.setState({
          img: tmp,
          floor: nextProps.floor
        });

      } catch (error) {
        console.log(error)
        axios.post('/error', {
          data: error.message 
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }

  setParamState = (name, param) => {
    this.setState({
      [name]: param
    })
  }

  showInfo = (x, y) => e =>{
    let upper = this;
    this.state.allUser.map((item) => {
        if (item.mapCoordinate.x === x 
          && item.mapCoordinate.y === y
          && this.state.floor === item.mapInfo.floorRefId){
            upper.setState({ info:[item.manufacturer, item.userName, item.macAddress] })
        }
    })
}

    render() {

    const { classes } = this.props;
    let image;

    if (!this.state.img) {
      image = (<CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Please select floor, building and cumpus
      </Typography>
      </CardContent>);
    } else {
      let width = this.myInput.current.offsetWidth;
      let height = width / 2;
      image = (
        <Stage width={width} height={height}>
          <UsersLocation
            floor={this.state.floor}
            src={this.state.img}
            width={width} height={height}
            updateParam={this.setParamState}
            redDot={this.state.redDot}
            notification={this.props.notification}
            showInfo={this.showInfo} />
        </Stage>);
    }
    return (
      <Card className={classes.card} >
        <Grid
          container
          direction="column"
          justify="space-between"
        >
          <div ref={this.myInput} className={classes.container} >
            {image}
            <Search  
            users={this.state.allUser} 
            redDot={this.setParamState} 
            setFloor={this.props.setFloor}
            info={this.state.info} />
          </div>
        </Grid>

      </Card>

    );
  }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(windowSize(ImgMediaCard));
