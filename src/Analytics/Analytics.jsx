import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
// import * as axios  from 'axios';
import HourlyConnected from "../Home/HourlyConnected";
import Header from "./Header";
import moment from "moment";

class Analytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// floor: 0,
			startDate: moment(new Date()).format('Y-MM-DD'),
			endDate: moment(new Date()).format('Y-MM-DD'),
		};
	}

	componentDidMount() {}

	getQueryParams = params => {
		this.setState({
			startDate: params.startDate,
			endDate: params.endDate,
		});
	};

	buildQueryParams = () => {
		if (this.state.startDate === this.state.endDate) {
			return {date: this.state.startDate};
		} else {
			return {
				startDate: this.state.startDate,
				endDate: this.state.endDate
			};
		}
	};

	render() {

		let params = this.buildQueryParams();
		return (
			<div className={"wrapper-sm-24"}>
				<Grid container direction={"column"}>
					<Grid item xs={12} className={"wrapper-24"}>
						<Header handleParams={this.getQueryParams}/>
					</Grid>
					<Grid item xs={12}>
						<HourlyConnected queryParams={params}/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Analytics;
