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

  validate = (str) => {
    if (str.match(/^([a-fA-F0-9]{2}:){5}([a-fA-F0-9]{2})$/g) ||
        str.match(/^([a-z]{3,8})$/g)){
      return true;
    }
    return false;
  }

  handleClick = () => {
    
    let tmp = this.state.userInput;
    let verdict = this.validate(tmp)

    if (tmp === "") { return ;}
    // validation if floor is choosen
    if (!this.props.users){
      this.setState(prevState => ({
        listOfsearch: [...prevState.listOfsearch, "Pls, choose floor"],
        userInput: ""
      }));
      return 
    }
    // search from array macaddres of username
    this.props.users.map(item => {
      let res = "";
      if (item.userName === tmp){
        console.log("find username ", item.mapInfo.mapHierarchyString);
        res = "Find " + item.userName + " at " + item.mapInfo.mapHierarchyString;
      } else if (item.macAddress === tmp){
        console.log("find macaddress", item);
        res = "Find " + item.macAddress + " at " + item.mapInfo.mapHierarchyString;
      }
      if (res !== ""){
        this.setState(prevState => ({
          listOfsearch: [...prevState.listOfsearch, res],
          userInput: ""
        }));
        return ;
      }
    })
    // handle wrong input
    this.setState(prevState => ({
      listOfsearch: [...prevState.listOfsearch, verdict ? prevState.userInput : "Wrond input"],
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
