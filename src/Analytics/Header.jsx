import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from "../Shared/Datepicker";
import moment from "moment";
import '../css/Datepicker.css';


const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		width: "100%"
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
});

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: moment(new Date()).format('Y-MM-DD'),
			endDate: moment(new Date()).format('Y-MM-DD')
		};
	}

	handleChangeDate = date => {
		this.setState({
			startDate: date.start,
			endDate: date.end
		});
		let params = {
			startDate: date.start,
			endDate: date.end,
			// floor: this.state.floor
		};
		this.props.handleParams(params);
	};





	render() {
		const { classes } = this.props;

		return (
			<Grid container direction={"row"} className={"wrapper-24"}>
				<Grid item xs={9} md={4}>
					<Datepicker changeDate={this.handleChangeDate} />
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Header);