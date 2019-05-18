import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {getPresenceParams} from "../../requests/credentials";
import axios from "axios";
import Week from "./Week";
import Month from "./Month";


class Insights extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			insights: undefined
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
				startDate: nextProps.startDate,
				endDate: nextProps.endDate
			},
			() => { this.fetchInsights() });
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

	fetchInsights = () => {
		let request = getPresenceParams();
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/insights', request.data)
			.then((result) => {
				console.log('result.data', result.data);
				this.setState({insights: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {

		if (typeof (this.state.insights) === 'undefined') {
			return (<div></div>);
		}

		return(
			<Grid container direction={"row"} spacing={24} className={"sm-no-spacing"}>
				<Week stats={this.state.insights.weekStats}/>
				<Month stats={this.state.insights.monthStats}/>
			</Grid>
		);
	}


}

export default Insights;

