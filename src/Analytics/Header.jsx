import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from "../Shared/Datepicker";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        // minWidth: 120,
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { floor: 0 };
    }

    handleChange = event => {
        this.setState({floor: event.target.value});
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container direction={"row"} className={"wrapper-24"}>
                <Grid item xs={5} md={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-floor">Floor</InputLabel>
                        <Select
                            value={this.state.floor}
                            onChange={this.handleChange}
                            inputProps={{name: 'floor', id: 'select-floor'}}
                        >
                            <MenuItem value={0}><em>All</em></MenuItem>
                            <MenuItem value={1}>First</MenuItem>
                            <MenuItem value={2}>Second</MenuItem>
                            <MenuItem value={3}>Third</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5} md={2}>
                    <Datepicker/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Header);