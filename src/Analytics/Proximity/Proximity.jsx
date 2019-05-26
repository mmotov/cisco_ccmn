import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {getPresenceParams} from "../../requests/credentials";
import TotalCount from "./TotalCount";
import ChartProximity from "./ChartProximity";

class Proximity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			visitorsCount: 0,
			connectedCount: 0,
			passerbyCount: 0,
			visitors: [],
			connected: [],
			passerby: []
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
			startDate: nextProps.startDate,
			endDate: nextProps.endDate
		},
			() => { this.fetchAll() });
	}

	fetchAll = () => {
		this.fetchConnected();
		this.fetchPasserby();
		this.fetchVisitors();



		this.fetchCountVisitors();
		this.fetchCountConnected();
		this.fetchCountPasserby();
	};

	fetchConnected () {

		let request = getPresenceParams();
		let timeSection = this.state.startDate === this.state.endDate ? 'hourly' : 'daily';
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/connected/' + timeSection, request.data)
			.then((result) => {
				this.setState({connected: result.data});
			})
			.catch((error) => {
				axios.post('/error', {
					data: error.message
				}).catch(function (error) {
					console.log(error);
				});
			});
	};

	fetchPasserby () {
		let request = getPresenceParams();
		let timeSection = this.state.startDate === this.state.endDate ? 'hourly' : 'daily';
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/passerby/' + timeSection, request.data)
			.then((result) => {
				this.setState({passerby: result.data});
			})
			.catch((error) => {
				axios.post('/error', {
					data: error.message
				}).catch(function (error) {
					console.log(error);
				});
			});
	};

	fetchVisitors () {
		let request = getPresenceParams();
		let timeSection = this.state.startDate === this.state.endDate ? 'hourly' : 'daily';
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/visitor/' + timeSection, request.data)
			.then((result) => {
				this.setState({visitors: result.data});
			})
			.catch((error) => {
				axios.post('/error', {
					data: error.message
				}).catch(function (error) {
					console.log(error);
				});
			});
	};

	fetchCountVisitors() {
		let request = getPresenceParams();
		request.data.params.startDate = this.state.startDate;
		request.data.params.endDate = this.state.endDate;
		axios.get(request.baseUrl + 'api/presence/v1/visitor/total', request.data)
			.then((result) => {
				this.setState({visitorsCount: result.data});
			})
			.catch((error) => {
				axios.post('/error', {
					data: error.message
				}).catch(function (error) {
					console.log(error);
				});
			});
	}

	fetchCountConnected() {
		let request = getPresenceParams();
		request.data.params.startDate = this.state.startDate;
		request.data.params.endDate = this.state.endDate;
		axios.get(request.baseUrl + 'api/presence/v1/connected/total', request.data)
			.then((result) => {
				this.setState({connectedCount: result.data});
			})
			.catch((error) => {
				axios.post('/error', {
					data: error.message
				}).catch(function (error) {
					console.log(error);
				});
			});
	}

	fetchCountPasserby() {
		let request = getPresenceParams();
		request.data.params.startDate = this.state.startDate;
		request.data.params.endDate = this.state.endDate;
		axios.get(request.baseUrl + 'api/presence/v1/passerby/total', request.data)
			.then((result) => {
				this.setState({passerbyCount: result.data});
			})
			.catch((error) => {
				axios.post('/error', {
					data: error.message
				}).catch(function (error) {
					console.log(error);
				});
			});
	}

	buildQueryDateParams = () => {
		if (this.state.startDate === this.state.endDate) {
			return {date: this.state.startDate};
		} else {
			return {
				startDate: this.state.startDate,
				endDate: this.state.endDate
			};
		}
	};

	isRange = () => {
		return this.state.startDate !== this.state.endDate;
	};

	render() {
		return (
			<Grid container direction={"row"} spacing={24} className={"sm-no-spacing"}>
				<Grid item xs={12} md={8} className={"m-t-sm-24"}>
					<ChartProximity visitors={this.state.visitors} connected={this.state.connected} passerby={this.state.passerby} range={this.isRange()} />
				</Grid>
				<Grid item xs={12} md={4} className={"m-t-sm-24"}>
					<TotalCount visitors={this.state.visitorsCount} connected={this.state.connectedCount} passerby={this.state.passerbyCount}/>
				</Grid>
			</Grid>
		);
	}
}

export default Proximity;