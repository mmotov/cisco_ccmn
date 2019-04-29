import React, {Component} from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import TextField from '@material-ui/core/TextField';
// import {FormControl} from 'react-bootstrap';
import moment from "moment";
import {withStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";


const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		width: "100%"
	},
});


class Datepicker extends Component {

	constructor(props) {
		super(props);
		let now = new Date();
		let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
		let end = moment(start).add(1, "days").subtract(1, "seconds");
		this.state = {
			startDate : start,
			endDate : end,
		};

		let date = {
			start: moment(this.state.startDate).format('Y-MM-DD'),
			end: moment(this.state.endDate).format('Y-MM-DD')
		};
		this.props.changeDate(date);
		this.applyCallback = this.applyCallback.bind(this);
	}

	applyCallback(startDate, endDate){
		this.setState({
			startDate: startDate,
			endDate : endDate,
		});
		let date = {
			start: moment(startDate).format('Y-MM-DD'),
			end: moment(endDate).format('Y-MM-DD')
		};
		this.props.changeDate(date);
	}

	render(){
		const { classes } = this.props;

		let now = new Date();
		let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
		let end = moment(start).add(1, "days").subtract(1, "seconds");
		let ranges = {
			"Today Only": [moment(start), moment(end)],
			"Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
			"3 Days": [moment(start).subtract(3, "days"), moment(end)]
		};
		let local = { "format":"DD-MM-YYYY" };
		let maxDate = moment(start).add(24, "hour")
		return(
			<DateTimeRangeContainer
				ranges={ranges}
				start={this.state.startDate}
				end={this.state.endDate}
				local={local}
				maxDate={maxDate}
				applyCallback={this.applyCallback}
			>
				<FormControl className={classes.formControl}>
					<TextField
						value={moment(this.state.startDate).format('Y, MMMM D') + ' - ' + moment(this.state.endDate).format('Y, MMMM D')}
					/>
				</FormControl>
			</DateTimeRangeContainer>
		);
	}
}

export default withStyles(styles)(Datepicker);