import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import {BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip} from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PollIcon from '@material-ui/icons/Poll';

const types = ['connected', 'passerby', 'visitors'];

const keys = {
	connected: {
		name: 'connected',
		color: '#2e7d32'
	},
	passerby: {
		name: 'passerby',
		color: '#0069fc'
	},
	visitors: {
		name: 'visitors',
		color: '#ff0043'
	}
};

class ChartProximity extends Component {

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

	render() {

		let chart = [];
		chart = this.setChartData(chart,'connected');
		chart = this.setChartData(chart,'visitors');
		chart = this.setChartData(chart,'passerby');

		const legendButtons = types.map((type, index) =>
			<div
				key={index}
				onClick={() => this.hideData(type)}
				className={"LegendItem"}
				style={{backgroundColor: keys[type].color, opacity: this.state[type] ? 1 : 0.6}}
			>
				{keys[type].name}
			</div>
		);

		const typesBars = types.map((type, index) => {
			if (this.state[type]) {
				return (
					<Bar
						key={index}
						type="monotone"
						dataKey={keys[type].name}
						fill={keys[type].color}
						fillOpacity={0.8}
					/>
				);
			} else {
				return false;
			}
		});

		return (
			<Card>
				<CardContent>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<PollIcon />
						<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Proximity</Typography>
					</Grid>
					<div>
						<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
							<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
								{legendButtons}
							</Grid>
						</Grid>
						<ResponsiveContainer width="100%" height={500}>
							<BarChart data={chart}>
								<CartesianGrid stroke="#ccc"/>
								<XAxis dataKey="time" height={60}/>
								<YAxis />
								<Tooltip />
								{typesBars}
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		);
	}
}

export default ChartProximity;