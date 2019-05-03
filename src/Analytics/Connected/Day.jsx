import React, { Component } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getPresenceParams } from '../../requests/credentials';
import axios from "axios";
import {Grid} from "@material-ui/core";



class Day extends Component {

	constructor(props) {
		super(props);
		this.state = {
			date: this.props.date,
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

	componentWillReceiveProps(nextProps) {
		this.setState(
			{date: nextProps.date},
			() => { this.fetchAll(this.state.date); }
		);
	}

	fetchAll = (date) => {
		this.fetchConnected(date);
		this.fetchPasserby(date);
		this.fetchVisitors(date);
	};

	fetchConnected = (date) => {
		let request = getPresenceParams();
		request.data.params.date = date;
		axios.get(request.baseUrl + 'api/presence/v1/connected/hourly', request.data)
			.then((result) => {
				this.setState({connected: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	fetchPasserby = (date) => {
		let request = getPresenceParams();
		request.data.params.date = date;
		axios.get(request.baseUrl + 'api/presence/v1/passerby/hourly', request.data)
			.then((result) => {
				this.setState({passerby: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	fetchVisitors = (date) => {
		let request = getPresenceParams();
		request.data.params.date = date;
		axios.get(request.baseUrl + 'api/presence/v1/visitor/hourly', request.data)
			.then((result) => {
				this.setState({visitors: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	setChartData = (chartData, type) => {
		let key = 0;
		for (let prop in this.state[type]) {
			if (this.state[type].hasOwnProperty(prop)) {
				key = prop;
				chartData[key][type] = this.state[type][prop];
			}
		}
		return chartData;
	};

	setTimeKeys = (chartData) => {
		let key = 0;
		while (key < 24) {
			let object = {};
			object.hour = key < 10 ? '0' + key + ':00' : key + ':00';
			chartData.push(object);
			key++;
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
		chart = this.setTimeKeys(chart);
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
						<XAxis dataKey="hour" height={60}/>
						<YAxis />
						<Tooltip />
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Day;
