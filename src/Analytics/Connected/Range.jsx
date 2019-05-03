import React, { Component } from 'react';
import { getPresenceParams } from '../../requests/credentials';
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {Grid} from "@material-ui/core";

class Range extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			connected: [],
			passerby: [],
			visitors: [],
			show: {
				connected: true,
				passerby: true,
				visitors: true
			}
		};
	}

	componentWillMount() {
		this.fetchAll(this.state.startDate, this.state.endDate);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(
			{
				startDate: nextProps.startDate,
				endDate: nextProps.endDate
			},
			() => { this.fetchAll(this.state.startDate, this.state.endDate); }
		);
	}

	fetchAll = (startDate, endDate) => {
		this.fetchConnected(startDate, endDate);
		this.fetchPasserby(startDate, endDate);
		this.fetchVisitors(startDate, endDate);
	};

	fetchConnected = (startDate, endDate) => {
		let request = getPresenceParams();
		request.data.params.startDate = startDate;
		request.data.params.endDate = endDate;
		axios.get(request.baseUrl + 'api/presence/v1/connected/daily', request.data)
			.then((result) => {
				console.log('RESULT: ', result.data);
				this.setState({connected: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	fetchPasserby = (startDate, endDate) => {
		let request = getPresenceParams();
		request.data.params.startDate = startDate;
		request.data.params.endDate = endDate;
		axios.get(request.baseUrl + 'api/presence/v1/passerby/daily', request.data)
			.then((result) => {
				this.setState({passerby: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	fetchVisitors = (startDate, endDate) => {
		let request = getPresenceParams();
		request.data.params.startDate = startDate;
		request.data.params.endDate = endDate;
		axios.get(request.baseUrl + 'api/presence/v1/visitor/daily', request.data)
			.then((result) => {
				this.setState({visitors: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	//
	setChartData = (chartData, type) => {
		let key = 0;
		for (let prop in this.state[type]) {
			if (this.state[type].hasOwnProperty(prop)) {
				if (typeof(chartData[key]) == 'undefined') {
					chartData[key] = {};
				}
				chartData[key].time = prop;
				chartData[key][type] = this.state[type][prop];
				key++;
			}
		}
		return chartData;
	};

	hideData = (type) => {
		let show = this.state.show;
		show[type] = !show[type];
		this.setState({show: show});
	};

	ChartBar = (type, color) => {
		if (this.state.show[type]) {
			return ( <Bar type="monotone" dataKey={type} fill={color} fillOpacity={0.8} /> );
		} else {
			return (<div></div>);
		}
	};


	render() {
		let chart = [];
		chart = this.setChartData(chart,'connected');
		chart = this.setChartData(chart,'visitors');
		chart = this.setChartData(chart,'passerby');
		return (
			<div>
				<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
					<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
						<div onClick={() => this.hideData("connected")} className={"LegendItem"} style={{backgroundColor: "#2e7d32", opacity: this.state.show.connected ? 1 : 0.6}}>Connected</div>
						<div onClick={() => this.hideData("visitors")} className={"LegendItem"} style={{backgroundColor: "#ff0043", opacity: this.state.show.visitors ? 1 : 0.6}}>Visitors</div>
						<div onClick={() => this.hideData("passerby")} className={"LegendItem"} style={{backgroundColor: "#0069fc", opacity: this.state.show.passerby ? 1 : 0.6}}>Passerby</div>
					</Grid>
				</Grid>
				<ResponsiveContainer width="90%" height={500}>
					<BarChart data={chart}>

						{this.ChartBar("connected", "#2e7d32")}
						{this.ChartBar("visitors", "#ff0043")}
						{this.ChartBar("passerby", "#0069fc")}

						<CartesianGrid stroke="#ccc"/>
						<XAxis dataKey="time" height={60}/>
						<YAxis />
						<Tooltip />
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Range;