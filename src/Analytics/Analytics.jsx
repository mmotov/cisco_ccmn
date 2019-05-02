import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import moment from "moment";

import Header from "./Header";
import Day from "./Connected/Day";
import Range from "./Connected/Range";


function Connected(props) {
	if (typeof(props.date.date) !== 'undefined') {
		return (<Day date={props.date.date} />);
	} else if (typeof(props.date.startDate) !== 'undefined' && typeof(props.date.endDate) !== 'undefined') {
		return (<Range startDate={props.date.startDate} endDate={props.date.endDate}/>);
	}
}

class Analytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			<div className={"wrapper-md-24"}>
				<Grid container direction={"column"}>
					<Grid item xs={12} className={"wrapper-24"}>
						<Header handleParams={this.getQueryParams}/>
					</Grid>
					<Grid item xs={12}>
						<Connected date={params} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Analytics;
