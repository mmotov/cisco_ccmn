import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import DevicesIcon from '@material-ui/icons/Devices';

class Devices extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	renderContent() {
		if (this.props.ready) {
			const propsDevices = this.props.data.devices;
			let sortedDevices = Object.keys(propsDevices).sort(function(a, b){return propsDevices[b] - propsDevices[a]});
			let deviceNames = [];
			for (let prop in sortedDevices) {
				if (sortedDevices.hasOwnProperty(prop)) {
					deviceNames.push(sortedDevices[prop]);
				}
			}
			return deviceNames.map((device, index) => {
				return (
					<div key={index} className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">{device}:</Typography>
						<Typography gutterBottom variant="body1">{this.props.data.devices[device]}</Typography>
					</div>
				);
			});
		}
	}

	render() {
		return (
			<Grid item xs={12} sm={6} md={3} className={"m-t-sm-24"}>
				<Card style={{height: "100%"}} className={"relative"}>
					<CardContent>
						<div className={"textRow"}>
							<Typography gutterBottom variant="headline">Devices</Typography>
							<DevicesIcon style={{fontSize: 32}}/>
						</div>
						<hr/>
						{this.renderContent()}
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

export default Devices;