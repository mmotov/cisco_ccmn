import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {getPresenceParams} from "../../requests/credentials";
import axios from "axios";
import Day from "./Daily";
import Range from "./Range";
import TotalCount from "./TotalCount";

class Dwell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			dwellTime: [],
			countDwellTime: {}
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
				startDate: nextProps.startDate,
				endDate: nextProps.endDate,
				dwellTime: []
			},
			() => { this.fetchAll() });
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

	fetchAll = () => {
		this.fetchDwellTime();
		this.fetchCountDwellTime();
	};

	fetchDwellTime() {
		let request = getPresenceParams();
		let timeSection = this.state.startDate === this.state.endDate ? 'hourly' : 'daily';
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/dwell/' + timeSection, request.data)
			.then((result) => {
				this.setState({dwellTime: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchCountDwellTime() {
		let request = getPresenceParams();
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/dwell/count', request.data)
			.then((result) => {
				console.log('RESPONSE: ', result.data);
				this.setState({countDwellTime: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	RenderDwell = () => {
		if (this.state.startDate === this.state.endDate) {
			return (<Day dwellTime={this.state.dwellTime} />);
		} else {
			return (<Range dwellTime={this.state.dwellTime} />);
		}
	};

	render() {
		return (
			<div>
				<Grid container direction={"row"} spacing={24} className={"sm-no-spacing"}>
					<Grid item xs={12} md={8} className={"m-t-sm-24"}>
						{this.RenderDwell()}
					</Grid>
					<Grid item xs={12} md={4} className={"m-t-sm-24"}>
						<TotalCount countDwellTime={this.state.countDwellTime} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Dwell;