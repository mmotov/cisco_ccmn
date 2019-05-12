import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import PeopleIcon from '@material-ui/icons/People';


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

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x  = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy  + radius * Math.sin(-midAngle * RADIAN);
	const showPercent = (percent * 100).toFixed(0);
	return (
		<text x={x} y={y} fill="white" textAnchor={'start'} dominantBaseline="central">
			{showPercent > 5 ? `${showPercent}%` : ''}
		</text>
	);
};

class TotalCount extends Component {

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

	hideData = (type) => {
		let obj = {};
		obj[type] = !this.state[type];
		this.setState(obj);
	};

	buildData() {
		let data = [];
		types.map((type, index) => {
			if (this.state[type]) {
				let obj = {
					name: keys[type].name,
					value: this.props.count[type],
					key: type
				};
				data.push(obj);
			}
		});
		return data;
	}

	render() {
		let data = this.buildData();
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

		return (
			<Card>
				<CardContent>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<PeopleIcon />
						<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Total Count</Typography>
					</Grid>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
							{legendButtons}
						</Grid>
					</Grid>
					<ResponsiveContainer width="100%" height={500}>
						<PieChart onMouseEnter={this.onPieEnter}>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={120}
								label={renderCustomizedLabel}
								fill="#8884d8"
							>
								{ data.map((entry, index) => <Cell key={index} fill={keys[entry.key].color}/>) }
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		);
	}

}

export default TotalCount;