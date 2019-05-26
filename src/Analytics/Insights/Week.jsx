import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TodayIcon from '@material-ui/icons/Today';
import moment from "moment";

const weekDays = ['---', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class Week extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	connectedHourOutput = () => {
		let start = moment(this.props.stats.peakHourDay + ' ' + this.props.stats.peakHour).format('MMMM Do YYYY, HH:mm');
		let end = moment(this.props.stats.peakHourDay + ' ' + (this.props.stats.peakHour + 1)).format('HH:mm');
		return start + ' - ' + end;
	};

	busiestHourOutput = () => {
		if (this.props.stats.busiestHour >= 0) {
			let start = moment(this.props.stats.peakHourDay + ' ' + this.props.stats.busiestHour).format('HH:mm');
			let end = moment(this.props.stats.peakHourDay + ' ' + (this.props.stats.busiestHour + 1)).format('HH:mm');
			return start + ' - ' + end;
		} else {
			return '---';
		}

	};

	render() {
		return (
			<Grid item xs={12} md={6} className={"m-t-sm-24"}>
				<Card style={{height: "100%"}}>
					<CardContent>
						<div className={"textRow"}>
							<Typography gutterBottom variant="headline">Week</Typography>
							<TodayIcon style={{fontSize: 32}}/>
						</div>
						<hr/>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Peak Day:</Typography>
							<Typography gutterBottom variant="body1">{moment(this.props.stats.peakDay).format('MMMM Do YYYY')} ({this.props.stats.peakCount} Visitors connected)</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Peak Hour:</Typography>
							<Typography gutterBottom variant="body1">{this.connectedHourOutput()} ({this.props.stats.peakHourCount} Visitors connected)</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Busiest day of week:</Typography>
							<Typography gutterBottom variant="body1">{weekDays[this.props.stats.busiestDay]}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Busiest hour:</Typography>
							<Typography gutterBottom variant="body1">{this.busiestHourOutput()}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Hourly average visitors:</Typography>
							<Typography gutterBottom variant="body1">{parseInt(this.props.stats.hourlyAverage)}</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
		);
	}

}

export default Week;