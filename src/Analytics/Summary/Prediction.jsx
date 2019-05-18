import React, {Component} from 'react';
import moment from "moment";
import {getPresenceParams} from "../../requests/credentials";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const types = ['visitors', 'connected', 'passerby'];

class Prediction extends Component {
	constructor(props) {
		super(props);
		let end = moment(new Date()).format("Y-MM-DD");
		let start = moment(new Date()).add(-30, "days").format("Y-MM-DD");
		this.state = {
			startDate: start,
			endDate: end,
			visitors: undefined,
			connected: undefined,
			passerby: undefined
		};

	}

	componentWillMount() {
		this.fetchConnected();
		this.fetchPasserby();
		this.fetchVisitors();
	}

	fetchConnected () {

		let request = getPresenceParams();
		let dates = {};
		dates.startDate = this.state.startDate;
		dates.endDate = this.state.endDate;
		request.data.params = {...request.data.params, ...dates};
		axios.get(request.baseUrl + 'api/presence/v1/connected/daily', request.data)
			.then((result) => {
				this.setState({connected: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	fetchPasserby () {
		let request = getPresenceParams();
		let dates = {};
		dates.startDate = this.state.startDate;
		dates.endDate = this.state.endDate;
		request.data.params = {...request.data.params, ...dates};
		axios.get(request.baseUrl + 'api/presence/v1/passerby/daily', request.data)
			.then((result) => {
				this.setState({passerby: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	fetchVisitors () {
		let request = getPresenceParams();
		let dates = {};
		dates.startDate = this.state.startDate;
		dates.endDate = this.state.endDate;
		request.data.params = {...request.data.params, ...dates};
		axios.get(request.baseUrl + 'api/presence/v1/visitor/daily', request.data)
			.then((result) => {
				this.setState({visitors: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	isKeyPresentInObj(key, obj) {
		return (typeof (this.state[obj][key]) !== "undefined");
	}

	predict(obj) {
		if (typeof(this.state[obj]) !== "undefined") {
			let currentKeyDate = moment(this.state.endDate).add(-6, "days").format("Y-MM-DD");
			let i = 0;
			let counts = [];
			while (this.isKeyPresentInObj(currentKeyDate, obj)) {
				counts.push(this.state[obj][currentKeyDate]);
				currentKeyDate = moment(currentKeyDate).add(-7, "days").format("Y-MM-DD");
				i++;
			}
			console.log("counts: ", counts);
			console.log("i: ", i);
			return parseInt(this.countAverage(counts, i));
		}
		return 0
	}

	countAverage(array, counts) {
		let sum = 0
		array.map((number, index) => {
			sum += number;
		});
		return sum / counts;
	}


	render() {
		let predictions = {};
		types.map((type, index) => {
			predictions[type] = this.predict(type);
		});
		return (
			<Grid item xs={12} sm={6} md={3} className={"m-t-sm-24"}>
				<Card style={{height: "100%"}}>
					<CardContent>
						<div className={"textRow"}>
							<Typography gutterBottom variant="headline">Tomorrow</Typography>
							<TrendingUpIcon style={{fontSize: 32}}/>
						</div>
						<hr />
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Visitors:</Typography>
							<Typography>~{predictions.visitors}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Connected:</Typography>
							<Typography>~{predictions.connected}</Typography>
						</div>
						<div className={"textRow"}>
							<Typography className={"rowTitle"} gutterBottom variant="caption">Passerby:</Typography>
							<Typography>~{predictions.passerby}</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
		);
	}

}

export default Prediction;