import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {getPresenceParams} from "../../requests/credentials";
import axios from "axios";
import Day from "../Dwell/Daily";
import Range from "../Dwell/Range";

class Dwell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			dwellTime: []
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

	RenderDwell = () => {
		if (this.state.startDate === this.state.endDate) {
			return (<Day dwellTime={this.state.dwellTime} />);
		} else {
			return (<Range dwellTime={this.state.dwellTime} />);
		}
	};

	render() {
		console.log('STATE DWELL: ', this.state.dwellTime);
		return (
			<div>
				<Grid container direction={"row"} spacing={24} className={"sm-no-spacing"}>
					<Grid item xs={12} md={8}>
						{this.RenderDwell()}
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Dwell;