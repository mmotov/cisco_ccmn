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
import { Stage, Layer, Image, Rect } from 'react-konva';

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

class URLImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    console.log(this.image.width, this.image.height)
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
      width: this.image.width,
      height: this.image.height,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}



class ImgMediaCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      floor: this.props.floor
    }
  }


  async componentWillReceiveProps(nextProps) {
    this.setState({
      floor: nextProps.floor
    })
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
        }, function () {
          console.log("lol")
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
      image = (
        <Stage width={600} height={300}>
          <Layer>
            <URLImage src={this.state.img} x={0} y={0} width={600} height={300} />
            <Rect
              x={0}
              y={0}
              width={10}
              height={10}
              fill="red"
              onClick={this.handleClick}
            />
          </Layer>
        </Stage>);
    }

    return (

      <Card lol="lol" className={classes.card}>
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

export default withStyles(styles)(ImgMediaCard);
