import React, { Component } from 'react';
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Brush} from "recharts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Grid} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from "@material-ui/core/Typography";

const keys = {
	FIVE_TO_THIRTY_MINUTES: {
		name: '5-30 min',
		color: '#4caf50'
	},
	THIRTY_TO_SIXTY_MINUTES: {
		name: '30-60 min',
		color: '#f57f17',
	},
	ONE_TO_FIVE_HOURS: {
		name: '1-5 hrs',
		color: '#2196f3',
	},
	FIVE_TO_EIGHT_HOURS: {
		name: '5-8 hrs',
		color: '#1a237e',
	},
	EIGHT_PLUS_HOURS: {
		name: '8+ hrs',
		color: '#b71c1c'
	}
};

class ChartDwell extends Component {

	constructor(props) {
		super(props);
		this.state = {
			FIVE_TO_THIRTY_MINUTES: true,
			THIRTY_TO_SIXTY_MINUTES: true,
			ONE_TO_FIVE_HOURS: true,
			FIVE_TO_EIGHT_HOURS: true,
			EIGHT_PLUS_HOURS: true
		};
	}

	setChartData = (chartData) => {
		let key = 0;
		for (let prop in this.props.dwellTime) {
			if (this.props.dwellTime.hasOwnProperty(prop)) {

				let data = {};
				for (let range in this.props.dwellTime[prop]) {
					if (this.props.dwellTime[prop].hasOwnProperty(range)) {
						data[keys[range].name] = this.props.dwellTime[prop][range];
					}
				}
				chartData[key] = data;
				chartData[key].time = prop;
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

	RenderBrush = () => {
		if (this.props.range) {
			return <Brush dataKey="time" height={30} stroke="#8884d8" />;
		} else {
			return false;
		}
	};

	render() {
		let chart = [];
		chart = this.setChartData(chart);
		let ranges = ['FIVE_TO_THIRTY_MINUTES', 'THIRTY_TO_SIXTY_MINUTES', 'ONE_TO_FIVE_HOURS', 'FIVE_TO_EIGHT_HOURS', 'EIGHT_PLUS_HOURS'];
		const legendButtons = ranges.map((range, index) =>
			<div
				key={index}
				onClick={() => this.hideData(range)}
				className={"LegendItem"}
				style={{backgroundColor: keys[range].color, opacity: this.state[range] ? 1 : 0.6}}
			>
				{keys[range].name}
			</div>
		);

		const rangesAreas = ranges.map((range, index) => {
			if (this.state[range]) {
				return (
					<Area
						key={index}
						type="monotone"
						dataKey={keys[range].name}
						stroke={keys[range].color}
						fillOpacity={1}
						fill={"url(#" + range + ")"}
					/>
				);
			} else {
				return false;
			}
		});

		const colorsGradients = ranges.map((range, index) =>
			<linearGradient key={index} id={range} x1="0" y1="0" x2="0" y2="1">
				<stop offset="5%" stopColor={keys[range].color} stopOpacity={0.9}/>
				<stop offset="95%" stopColor={keys[range].color} stopOpacity={0}/>
			</linearGradient>
		);


		return (
			<div>
				<Card>
					<CardContent>
						<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
							<AccessTimeIcon />
							<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Dwell Time</Typography>
						</Grid>
						<div>
							<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
								<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
									{legendButtons}
								</Grid>
							</Grid>
							<ResponsiveContainer width="100%" height={500}>
								<AreaChart data={chart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
									<defs>{colorsGradients}</defs>
									<XAxis dataKey="time" />
									<YAxis />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									{this.RenderBrush()}
									{rangesAreas}
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default ChartDwell;