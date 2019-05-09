import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Brush} from "recharts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Grid} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import Typography from "@material-ui/core/Typography";

let types = ['DAILY', 'WEEKLY', 'OCCASIONAL', 'FIRST_TIME', 'YESTERDAY'];

const keys = {

	DAILY: {
		name: 'Daily',
		color: '#4caf50'
	},
	WEEKLY: {
		name: 'Weekly',
		color: '#f57f17',
	},
	OCCASIONAL: {
		name: 'Occasional',
		color: '#2196f3',
	},
	FIRST_TIME: {
		name: 'First Time',
		color: '#1a237e',
	},
	YESTERDAY: {
		name: 'Yesterday',
		color: '#b71c1c'
	}
};

class ChartRepeatVisitors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DAILY: true,
			WEEKLY: true,
			OCCASIONAL: true,
			FIRST_TIME: true,
			YESTERDAY: true
		};
	}

	setChartData = (chartData) => {
		let key = 0;
		for (let prop in this.props.repeatVisitors) {
			if (this.props.repeatVisitors.hasOwnProperty(prop)) {
				let data = {};
				for (let type in this.props.repeatVisitors[prop]) {
					if (this.props.repeatVisitors[prop].hasOwnProperty(type)) {
						data[keys[type].name] = this.props.repeatVisitors[prop][type];
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

		const rangesLines = types.map((type, index) => {
			if (this.state[type]) {
				return (
					<Line
						key={index}
						type="monotone"
						dataKey={keys[type].name}
						stroke={keys[type].color}
					/>
				);
			} else {
				return false;
			}
		});

		return (
			<div>
				<Card>
					<CardContent>
						<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
							<PeopleIcon />
							<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Repeat Visitors</Typography>
						</Grid>
						<div>
							<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
								<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
									{legendButtons}
								</Grid>
							</Grid>
							<ResponsiveContainer width="100%" height={500}>
								<LineChart data={chart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
									<XAxis dataKey="time" />
									<YAxis />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									{this.RenderBrush()}
									{rangesLines}
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default ChartRepeatVisitors;