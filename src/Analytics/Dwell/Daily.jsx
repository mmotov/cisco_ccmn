import React, { Component } from 'react';
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Bar} from 'recharts';
import CardContent from "@material-ui/core/CardContent";
import {Grid} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

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

class Daily extends Component {

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
				key = prop;
				let data = {};
				for (let range in this.props.dwellTime[prop]) {
					if (this.props.dwellTime[prop].hasOwnProperty(range)) {
						data[keyNames[range]] = this.props.dwellTime[prop][range];
					}
				}
				chartData[key] = data;
				chartData[key].hour = key < 10 ? '0' + key + ':00' : key + ':00';
			}
		}
		return chartData;
	};

	hideData = (type) => {
		let obj = {};
		obj[type] = !this.state[type];
		this.setState(obj);
	};

	RenderArea = (type, color) => {
		if (this.state[type]) {
			return ( <Area type="monotone" dataKey={keyNames[type]} stroke={color} fillOpacity={1} fill={"url(#" + type + ")"} /> );
		} else {
			return (<div> </div>);
		}
	};

	render() {
		let chart = [];
		chart = this.setChartData(chart);
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
									<div onClick={() => this.hideData("FIVE_TO_THIRTY_MINUTES")}    className={"LegendItem"} style={{backgroundColor: COLORS["FIVE_TO_THIRTY_MINUTES"], opacity: this.state.FIVE_TO_THIRTY_MINUTES ? 1 : 0.6}}>5-30 min</div>
									<div onClick={() => this.hideData("THIRTY_TO_SIXTY_MINUTES")}   className={"LegendItem"} style={{backgroundColor: COLORS["THIRTY_TO_SIXTY_MINUTES"], opacity: this.state.THIRTY_TO_SIXTY_MINUTES ? 1 : 0.6}}>30-60 min</div>
									<div onClick={() => this.hideData("ONE_TO_FIVE_HOURS")}         className={"LegendItem"} style={{backgroundColor: COLORS["ONE_TO_FIVE_HOURS"], opacity: this.state.ONE_TO_FIVE_HOURS ? 1 : 0.6}}>1-5 hrs</div>
									<div onClick={() => this.hideData("FIVE_TO_EIGHT_HOURS")}       className={"LegendItem"} style={{backgroundColor: COLORS["FIVE_TO_EIGHT_HOURS"], opacity: this.state.FIVE_TO_EIGHT_HOURS ? 1 : 0.6}}>5-8 hrs</div>
									<div onClick={() => this.hideData("EIGHT_PLUS_HOURS")}          className={"LegendItem"} style={{backgroundColor: COLORS["EIGHT_PLUS_HOURS"], opacity: this.state.EIGHT_PLUS_HOURS ? 1 : 0.6}}>8+ hrs</div>
								</Grid>
							</Grid>
							<ResponsiveContainer width="100%" height={500}>
								<AreaChart data={chart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
									<defs>
										<linearGradient id="EIGHT_PLUS_HOURS" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#b71c1c" stopOpacity={0.9}/>
											<stop offset="95%" stopColor="#b71c1c" stopOpacity={0}/>
										</linearGradient>

										<linearGradient id="FIVE_TO_EIGHT_HOURS" x1="0" y1="0" x2="0" y2="1">
											<stop offset="10%" stopColor="#1a237e" stopOpacity={0.9}/>
											<stop offset="95%" stopColor="#1a237e" stopOpacity={0}/>
										</linearGradient>

										<linearGradient id="ONE_TO_FIVE_HOURS" x1="0" y1="0" x2="0" y2="1">
											<stop offset="10%" stopColor="#2196f3" stopOpacity={0.9}/>
											<stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
										</linearGradient>

										<linearGradient id="THIRTY_TO_SIXTY_MINUTES" x1="0" y1="0" x2="0" y2="1">
											<stop offset="10%" stopColor="#f57f17" stopOpacity={0.9}/>
											<stop offset="95%" stopColor="#f57f17" stopOpacity={0}/>
										</linearGradient>

										<linearGradient id="FIVE_TO_THIRTY_MINUTES" x1="0" y1="0" x2="0" y2="1">
											<stop offset="10%" stopColor="#4caf50" stopOpacity={0.9}/>
											<stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
										</linearGradient>
									</defs>
									<XAxis dataKey="hour" />
									<YAxis />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />

									{this.RenderArea("EIGHT_PLUS_HOURS", "#b71c1c")}
									{this.RenderArea("FIVE_TO_EIGHT_HOURS", "#1a237e")}
									{this.RenderArea("ONE_TO_FIVE_HOURS", "#2196f3")}
									{this.RenderArea("THIRTY_TO_SIXTY_MINUTES", "#f57f17")}
									{this.RenderArea("FIVE_TO_THIRTY_MINUTES", "#4caf50")}

								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

}

export default Daily;