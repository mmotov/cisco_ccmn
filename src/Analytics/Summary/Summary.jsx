import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {getPresenceParams} from "../../requests/credentials";
import axios from "axios";
import Visitors from "./Visitors";
import DwellTime from "./DwellTime";
import Devices from "./Devices";
import Prediction from "./Prediction";

class Summary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			summary: undefined
		};
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

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
				startDate: nextProps.startDate,
				endDate: nextProps.endDate
			},
			() => { this.fetchSummary() });
	}

	fetchSummary = () => {
		let request = getPresenceParams();
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/kpisummary', request.data)
			.then((result) => {
				console.log('result.data', result.data);
				this.setState({summary: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	visitorsData() {
		if (this.state.summary !== undefined) {
			return {
				connected: this.state.summary.totalConnectedCount,
				passerby: this.state.summary.totalPasserbyCount,
				visitors: this.state.summary.totalVisitorCount,
				percentage: this.state.summary.connectedPercentage,
				conversionRate: this.state.summary.connectedPercentage,
			};
		} else {
			return {
				connected: undefined,
				passerby: undefined,
				visitors: undefined,
				percentage: undefined,
				conversionRate: undefined,
			};
		}
	}

	dwellData() {
		if (this.state.summary !== undefined) {
			return {
				averageDwellTime: this.state.summary.averageDwell,
				peakSummary: this.state.summary.peakSummary ? this.state.summary.peakSummary : this.state.summary.peakWeekSummary,
				dwellLevels: this.state.summary.averageDwellByLevels
			};
		} else {
			return {
				averageDwellTime: undefined,
				peakSummary: undefined,
				dwellLevels: undefined
			};
		}
	}

	devicesData() {
		if (this.state.summary !== undefined) {
			return {devices: this.state.summary.topManufacturers.manufacturerCounts}
		} else {
			return {devices: undefined}
		}
	}

	render() {

		const dataReady = this.state.summary !== undefined;

		return(
			<Grid container direction={"row"} spacing={24} className={"sm-no-spacing"}>
				<Visitors
					ready={dataReady}
					data={this.visitorsData()}
				/>
				<DwellTime
					ready={dataReady}
					data={this.dwellData()}
				/>
				<Devices
					ready={dataReady}
					data={this.devicesData()}
				/>
				<Prediction/>

			</Grid>
		);
	}

}

export default Summary;