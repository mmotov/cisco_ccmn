import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

class Visitors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: this.props.data.ready,
			visitors: this.props.data.visitors,
			connected: this.props.data.connected,
			passerby: this.props.data.passerby,
			percentage: this.props.data.percentage,
			conversionRateL: this.props.data.conversionRateL

		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState(nextProps);
	}

	renderContent() {
		if (this.state.ready) {
			return (
				<div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Total Visitors:</Typography>
						<Typography gutterBottom variant="body1">{this.state.visitors}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Total Connected:</Typography>
						<Typography>{this.state.connected}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Total Passerby:</Typography>
						<Typography>{this.state.passerby}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Connected Percentage:</Typography>
						<Typography>{this.state.percentage} %</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Conversion Rate:</Typography>
						<Typography>{this.state.conversionRate} %</Typography>
					</div>
				</div>
			);
		}
	}

	render() {

		return (
			<Grid item xs={12} sm={6} md={3} className={"m-t-sm-24"}>
				<Card style={{height: "100%"}} className={"relative"}>
					<CardContent>
						<div className={"textRow"}>
							<Typography gutterBottom variant="headline">Visitors</Typography>
							<PeopleOutlineIcon style={{fontSize: 32}}/>
						</div>
						<hr/>
						{this.renderContent()}
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

export default Visitors;