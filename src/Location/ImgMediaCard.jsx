import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios/index';
import config from '../config.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomizedInputBase from './CustomizedInputBase.jsx'
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

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

class ImgMediaCard extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      floor: this.props.floor
    }
    // this.image = this.image.bind(this);
    // this.requist = this.requist.bind(this);
  }



  async componentWillReceiveProps(nextProps){
      this.setState({
        floor: nextProps.floor
      })
      if (nextProps.floor){
        try {
          let url = config.location + "api/config/v1/maps/image" + nextProps.imageSrc;
          let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
          let res = await axios.get(url, {
                  headers: {
                      Authorization: header,
                  },
                  responseType: 'arraybuffer'
              });

              this.setState({
                img: "data:image/png;base64," +  new Buffer(res.data).toString('base64'),
              });
        } catch (error){
          console.log(error)
        }
      }
  }

  image = () => {
    if (!this.state.img){
      return (<CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Please select floor, building and cumpus
        </Typography>
      </CardContent>);
    }
    return (<CardMedia
      component="img"
      alt="Contemplative Reptile"
      className={this.props.media}
      height="auto"
      image={this.state.img}
      title="Contemplative Reptile"
    />);
  }

  render() {

  const { classes } = this.props;

  return (

      <Card lol="lol" className={classes.card}>
        <Grid
            container
            direction="column"
            justify="space-between"

            >
            <CardActionArea>
              {this.image()}
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
