import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import moment from "moment";

import Header from "./Header";
import Proximity from "./Proximity/Proximity";
import Dwell from "./Dwell/Dwell";
import RepeatVisitors from "./RepeatVisitors/RepeatVisitors";
import Summary from "./Summary/Summary";
import Insights from "./Insights/Insights";

class Analytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: moment(new Date()).format('Y-MM-DD'),
			endDate: moment(new Date()).format('Y-MM-DD'),
		};
	}

	getQueryParams = params => {
		this.setState({
				startDate: params.startDate,
				endDate: params.endDate
			});
	};

	render() {
		return (
			<div className={"wrapper-md-24"}>
				<Grid container direction={"column"}>
					<Grid item xs={12} className={"wrapper-24"}>
						<Header handleParams={this.getQueryParams}/>
					</Grid>
					<Summary startDate={this.state.startDate} endDate={this.state.endDate} />
					<Insights       startDate={this.state.startDate} endDate={this.state.endDate} />
					<Proximity      startDate={this.state.startDate} endDate={this.state.endDate} />
					<Dwell          startDate={this.state.startDate} endDate={this.state.endDate} />
					<RepeatVisitors startDate={this.state.startDate} endDate={this.state.endDate} />
				</Grid>
			</div>
		);


	}
}

export default Analytics;
