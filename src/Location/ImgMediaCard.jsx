import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios/index';
import config from '../config.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomizedInputBase from './CustomizedInputBase.jsx'
import Grid from '@material-ui/core/Grid';
import { Stage, Layer, Rect } from 'react-konva';
import windowSize from 'react-window-size';
import UsersLocation from './UsersLocation.jsx';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: '90%',
    height: '80vh',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

class ImgMediaCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      floor: this.props.floor
    }
  }


  async componentWillReceiveProps(nextProps) {
    if (nextProps.floor) {
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
      }
    }
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
      let width = this.props.windowWidth - 200;
      let height = (this.props.windowWidth - 200)/2;
      image = (
        <Stage width={width} height={height}>
          <UsersLocation floor={this.state.floor} src={this.state.img} width={width} height={height} />
        </Stage>);
    }
    return (

      <Card className={classes.card}>
        <Grid
          container
          direction="column"
          justify="space-between"
        >
          <CardActionArea>
            {image}
            <CssBaseline />
            <CardContent>
              <Typography component="p">
                Hi, @xlogin or mac: 00:00:2a:01:00:06 now is on the first floor.
                </Typography>
              <Typography component="p">
                Hi, @xlogin or mac: 00:00:2a:01:00:06 now is on the first floor.
                </Typography>
              <Typography component="p">
                Hi, @xlogin or mac: 00:00:2a:01:00:06 now is on the first floor.
                </Typography>
              <Typography component="p">
                Hi, @xlogin or mac: 00:00:2a:01:00:06 now is on the first floor.
                </Typography>
            </CardContent>
          </CardActionArea>
          <CustomizedInputBase />
        </Grid>
      </Card>

    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(windowSize(ImgMediaCard));
