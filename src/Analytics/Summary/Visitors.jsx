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

		};
	}

	render() {
		return (
			<Grid item xs={12} sm={6} md={3} className={"m-t-sm-24"}>
				<Card style={{height: "100%"}}>
					<CardContent>
						<div className={"textRow"}>
							<Typography gutterBottom variant="headline">Visitors</Typography>
							<PeopleOutlineIcon style={{fontSize: 32}}/>
						</div>
						<hr/>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Total Visitors:</Typography>
							<Typography gutterBottom variant="body1">{this.props.visitors}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Total Connected:</Typography>
							<Typography>{this.props.connected}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Total Passerby:</Typography>
							<Typography>{this.props.passerby}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Connected Percentage:</Typography>
							<Typography>{this.props.precentage} %</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Conversion Rate:</Typography>
							<Typography>{this.props.conversionRate} %</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

export default Visitors;