import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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
    height: '100%',
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

  validate = (str) => {
    if (str.match(/^([a-fA-F0-9]{2}:){5}([a-fA-F0-9]{2})$/g) ||
      str.match(/^([a-z]{3,8})$/g)) {
      return true;
    }
    return false;
  }

  handleClick = () => {

    let tmp = this.state.userInput;
    let verdict = this.validate(tmp)
    let upper = this;

    if (tmp === "") { return; }
    // validation if floor is choosen
    if (!this.props.users) {
      this.setState(prevState => ({
        listOfsearch: [...prevState.listOfsearch, "Pls, choose floor"],
        userInput: ""
      }));
      return
    }
    if (!verdict) {
      this.setState(prevState => ({
        listOfsearch: [...prevState.listOfsearch, "Wrong input"],
        userInput: ""
      }));
      return;
    }
    // search from array macaddres of username
    let res = "";
    this.props.users.map(item => {

      if (item.userName === tmp) {
        res = item.userName + " is at " + item.mapInfo.mapHierarchyString.split('>')[2];
        upper.props.redDot("redDot", item);
        upper.props.setFloor(item.mapInfo.floorRefId)
      } else if (item.macAddress === tmp) {
        res = "Find " + item.macAddress + " at " + item.mapInfo.mapHierarchyString.split('>')[2];
        upper.props.redDot("redDot", item);
        upper.props.setFloor(item.mapInfo.floorRefId)
      }
    })
    // handle wrong input
    if (res === "") {
      this.setState(prevState => ({
        listOfsearch: [...prevState.listOfsearch, prevState.userInput + " not found"],
        userInput: ""
      }));
    } else {
      this.setState(prevState => ({
        listOfsearch: [...prevState.listOfsearch, res],
        userInput: ""
      }));
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.info !== this.props.info){
      this.addInfo(nextProps.info);
    }
  }

  addInfo = (param) => {
    let upper = this;
    param.map(item => {
      upper.setState(prevState => ({
        listOfsearch: [...prevState.listOfsearch, item]
      }))
    })
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      this.handleClick();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerInput}>
        <CardContent className={classes.scroll}>
          {this.state.listOfsearch.map((item, index) => {

            return (<Typography key={index} component="p">
              {item}
            </Typography>);
          })}
        </CardContent>
        <Paper className={classes.root} elevation={1}>
          <InputBase className={classes.input}
            placeholder="Search macaddress or login"
            onChange={this.handleInput}
            value={this.state.userInput}
            onKeyPress={this.handleKeyPress} />
          <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleClick} >
            <SearchIcon />
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
