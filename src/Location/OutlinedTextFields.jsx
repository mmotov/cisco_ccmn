import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class OutlinedTextFields extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: this.props.name,
      value: ""
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.value){
      this.setState({
        value: nextProps.value
      })
    } else {
      this.setState({
        list: nextProps.name.sort()
      })
    }
  }

  handleChange = () => event => {
    this.setState({
      value: event.target.value,
    });
    this.props.handleChange(this.props.title, event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">

        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange()}
          helperText={"Please select your " + this.props.title}
          margin="normal"
          variant="outlined"
        >
          {this.state.list.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
