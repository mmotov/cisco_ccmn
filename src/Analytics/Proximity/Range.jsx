import React, { Component } from 'react';
import {BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Brush} from 'recharts';
import {Grid} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import PollIcon from '@material-ui/icons/Poll';
import Typography from "@material-ui/core/Typography";

class Range extends Component {

	constructor(props) {
		super(props);
		this.state = {
			connected: true,
			passerby: true,
			visitors: true
		};
	}

	setChartData = (chartData, type) => {
		let key = 0;
		for (let prop in this.props[type]) {
			if (this.props[type].hasOwnProperty(prop)) {
				if (typeof(chartData[key]) == 'undefined') {
					chartData[key] = {};
				}
				chartData[key].time = prop;
				chartData[key][type] = this.props[type][prop];
				key++;
			}
		}
		return chartData;
	};

	hideData = (type) => {
		let obj = {};
		obj[type] = !this.state[type];
		this.setState(obj);
	};

	ChartBar = (type, color) => {
		if (this.state[type]) {
			return ( <Bar type="monotone" dataKey={type} fill={color} fillOpacity={0.8} /> );
		} else {
			return (<div> </div>);
		}
	};


	render() {
		let chart = [];
		chart = this.setChartData(chart,'connected');
		chart = this.setChartData(chart,'visitors');
		chart = this.setChartData(chart,'passerby');
		return (
			<Card>
				<CardContent>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<PollIcon />
						<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Proximity</Typography>
					</Grid>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
							<div onClick={() => this.hideData("connected")} className={"LegendItem"} style={{backgroundColor: "#2e7d32", opacity: this.state.connected ? 1 : 0.6}}>Connected</div>
							<div onClick={() => this.hideData("visitors")} className={"LegendItem"} style={{backgroundColor: "#ff0043", opacity: this.state.visitors ? 1 : 0.6}}>Visitors</div>
							<div onClick={() => this.hideData("passerby")} className={"LegendItem"} style={{backgroundColor: "#0069fc", opacity: this.state.passerby ? 1 : 0.6}}>Passerby</div>
						</Grid>
					</Grid>
					<ResponsiveContainer width="100%" height={500}>
						<BarChart data={chart}>

							{this.ChartBar("connected", "#2e7d32")}
							{this.ChartBar("visitors", "#ff0043")}
							{this.ChartBar("passerby", "#0069fc")}

							<CartesianGrid stroke="#ccc"/>
							<XAxis dataKey="time" height={60}/>
							<YAxis />
							<Tooltip />
							<Brush dataKey="time" height={30} stroke="#8884d8" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		);
	}
}

export default Range;