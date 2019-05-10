import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  containerInput: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  scroll: {
    overflowY: 'scroll',
    height: '100%',
  },
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      listOfsearch: []
    }
  }

  handleInput = (event) => {
    this.setState({ userInput: event.target.value });
  }

  handleClick = () => {
    
    let tmp = this.state.userInput;
    this.props.users.map(item => {
      console.log(item.userName)
      if (item.userName === tmp){
        console.log("vin");
      }
    })
    this.setState(prevState => ({
      listOfsearch: [...prevState.listOfsearch, prevState.userInput],
      userInput: ""
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerInput}>
        <CssBaseline />
        <CardContent className={classes.scroll}>
        { this.state.listOfsearch.map((item, index) => {
          
          return (<Typography key={index} component="p">
            {item}
          </Typography>);
        })}
        </CardContent>
        <Paper className={classes.root} elevation={1}>
          <InputBase className={classes.input} placeholder="Search macaddress or login" onChange={this.handleInput} value={this.state.userInput} />
          <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleClick} >
            <SearchIcon  />
          </IconButton>
        </Paper>
      </div>

    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
