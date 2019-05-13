import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Grid} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from "@material-ui/core/Typography";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";


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

const ranges = ['FIVE_TO_THIRTY_MINUTES', 'THIRTY_TO_SIXTY_MINUTES', 'ONE_TO_FIVE_HOURS', 'FIVE_TO_EIGHT_HOURS', 'EIGHT_PLUS_HOURS'];

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
			FIVE_TO_THIRTY_MINUTES: true,
			THIRTY_TO_SIXTY_MINUTES: true,
			ONE_TO_FIVE_HOURS: true,
			FIVE_TO_EIGHT_HOURS: true,
			EIGHT_PLUS_HOURS: true
		};
	}

	hideData = (type) => {
		let obj = {};
		obj[type] = !this.state[type];
		this.setState(obj);
	};

	buildData() {
		let data = [];
		ranges.map((range, index) => {
			if (this.state[range]) {
				let obj = {
					name: keys[range].name,
					value: this.props.countDwellTime[range],
					key: range
				};
				data.push(obj);
			}
		});
		return data;
	}

	render() {
		let data = this.buildData();
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

		return (
			<Card>
				<CardContent>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<AccessTimeIcon />
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