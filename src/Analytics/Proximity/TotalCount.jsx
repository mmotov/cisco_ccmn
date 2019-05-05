import React, { Component } from 'react';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import PollIcon from '@material-ui/icons/Poll';

const COLORS = {
	connected: '#2e7d32',
	visitors: '#ff0043',
	passerby: '#0069fc'
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x  = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy  + radius * Math.sin(-midAngle * RADIAN);
	return (
		<text x={x} y={y} fill="white" textAnchor={'start'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

class TotalCount extends Component {

	constructor(props) {
		super(props);
		this.state = {
			connected: true,
			passerby: true,
			visitors: true
		}
	}

	hideData = (type) => {
		let obj = {};
		obj[type] = !this.state[type];
		this.setState(obj);
	};

	buildData() {
		let data = [];
		let obj = {};
		if (this.state.visitors) {
			 obj = { name: "visitors", value: this.props.visitors};
			 data.push(obj);
		}
		if (this.state.connected) {
			obj = { name: "connected", value: this.props.connected};
			data.push(obj);
		}
		if (this.state.passerby) {
			obj = { name: "passerby", value: this.props.passerby};
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
						<PollIcon />
						<Typography style={{margin: '5px 4px'}} color="textSecondary" gutterBottom>Total Count</Typography>
					</Grid>
					<Grid container direction={"row"} className={"wrapper-sm-24 m-b-24"}>
						<Grid item xs={12} className={"wrapper-24 FlexRow SpaceAround"}>
							<div onClick={() => this.hideData("connected")} className={"LegendItem"} style={{backgroundColor: "#2e7d32", opacity: this.state.connected ? 1 : 0.6}}>Connected</div>
							<div onClick={() => this.hideData("visitors")} className={"LegendItem"} style={{backgroundColor: "#ff0043", opacity: this.state.visitors ? 1 : 0.6}}>Visitors</div>
							<div onClick={() => this.hideData("passerby")} className={"LegendItem"} style={{backgroundColor: "#0069fc", opacity: this.state.passerby ? 1 : 0.6}}>Passerby</div>
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
								{ data.map((entry, index) => <Cell key={index} fill={COLORS[entry.name]}/>) }
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