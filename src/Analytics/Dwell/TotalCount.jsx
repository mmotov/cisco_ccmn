import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Grid} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from "@material-ui/core/Typography";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";


const keyNames = {
	FIVE_TO_THIRTY_MINUTES: '5-30 min',
	THIRTY_TO_SIXTY_MINUTES: '30-60 min',
	ONE_TO_FIVE_HOURS: '1-5 hrs',
	FIVE_TO_EIGHT_HOURS: '5-8 hrs',
	EIGHT_PLUS_HOURS: '8+ hrs'
};

const COLORS = {
	FIVE_TO_THIRTY_MINUTES: '#4caf50',
	THIRTY_TO_SIXTY_MINUTES: '#f57f17',
	ONE_TO_FIVE_HOURS: '#2196f3',
	FIVE_TO_EIGHT_HOURS: '#1a237e',
	EIGHT_PLUS_HOURS: '#b71c1c'
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
		console.log('this.props: ', this.props);
		let data = [];
		let obj = {};
		if (this.state.FIVE_TO_THIRTY_MINUTES) {
			obj = { name: keyNames["FIVE_TO_THIRTY_MINUTES"], value: this.props.countDwellTime.FIVE_TO_THIRTY_MINUTES, key: "FIVE_TO_THIRTY_MINUTES"};
			data.push(obj);
		}
		if (this.state.THIRTY_TO_SIXTY_MINUTES) {
			obj = { name: keyNames["THIRTY_TO_SIXTY_MINUTES"], value: this.props.countDwellTime.THIRTY_TO_SIXTY_MINUTES, key: "THIRTY_TO_SIXTY_MINUTES"};
			data.push(obj);
		}
		if (this.state.ONE_TO_FIVE_HOURS) {
			obj = { name: keyNames["ONE_TO_FIVE_HOURS"], value: this.props.countDwellTime.ONE_TO_FIVE_HOURS, key: "ONE_TO_FIVE_HOURS"};
			data.push(obj);
		}
		if (this.state.FIVE_TO_EIGHT_HOURS) {
			obj = { name: keyNames["FIVE_TO_EIGHT_HOURS"], value: this.props.countDwellTime.FIVE_TO_EIGHT_HOURS, key: "FIVE_TO_EIGHT_HOURS"};
			data.push(obj);
		}
		if (this.state.EIGHT_PLUS_HOURS) {
			obj = { name: keyNames["EIGHT_PLUS_HOURS"], value: this.props.countDwellTime.EIGHT_PLUS_HOURS, key: "EIGHT_PLUS_HOURS"};
			data.push(obj);
		}
		return data;
	}

	render() {
		let data = this.buildData();

		return (
			<Card>
				<CardContent>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<AccessTimeIcon />
						<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Total Count</Typography>
					</Grid>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
							<div onClick={() => this.hideData("FIVE_TO_THIRTY_MINUTES")} className={"LegendItem"} style={{backgroundColor: COLORS["FIVE_TO_THIRTY_MINUTES"], opacity: this.state.FIVE_TO_THIRTY_MINUTES ? 1 : 0.6}}>{keyNames["FIVE_TO_THIRTY_MINUTES"]}</div>
							<div onClick={() => this.hideData("THIRTY_TO_SIXTY_MINUTES")} className={"LegendItem"} style={{backgroundColor: COLORS["THIRTY_TO_SIXTY_MINUTES"], opacity: this.state.THIRTY_TO_SIXTY_MINUTES ? 1 : 0.6}}>{keyNames["THIRTY_TO_SIXTY_MINUTES"]}</div>
							<div onClick={() => this.hideData("ONE_TO_FIVE_HOURS")} className={"LegendItem"} style={{backgroundColor: COLORS["ONE_TO_FIVE_HOURS"], opacity: this.state.ONE_TO_FIVE_HOURS ? 1 : 0.6}}>{keyNames["ONE_TO_FIVE_HOURS"]}</div>
							<div onClick={() => this.hideData("FIVE_TO_EIGHT_HOURS")} className={"LegendItem"} style={{backgroundColor: COLORS["FIVE_TO_EIGHT_HOURS"], opacity: this.state.FIVE_TO_EIGHT_HOURS ? 1 : 0.6}}>{keyNames["FIVE_TO_EIGHT_HOURS"]}</div>
							<div onClick={() => this.hideData("EIGHT_PLUS_HOURS")} className={"LegendItem"} style={{backgroundColor: COLORS["EIGHT_PLUS_HOURS"], opacity: this.state.EIGHT_PLUS_HOURS ? 1 : 0.6}}>{keyNames["EIGHT_PLUS_HOURS"]}</div>
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
								{ data.map((entry, index) => <Cell key={index} fill={COLORS[entry.key]}/>) }
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