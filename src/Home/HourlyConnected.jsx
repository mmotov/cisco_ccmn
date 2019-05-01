import React, { Component } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { visitorsHourly } from '../requests/presence/visitors';
import { getPresenceParams } from '../requests/credentials';
import axios from "axios";
import {Grid} from "@material-ui/core";

class HourlyConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.queryParams.date,
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

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {date: nextProps.queryParams.date},
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

    hideData = (event) => {
        console.log('EVENT Legend: ', event);
        let opacity = Object.assign({}, this.state.opacity);    //creating copy of object
        opacity[event.dataKey] = opacity[event.dataKey] ? 0 : 1;                        //updating value
        this.setState({opacity: opacity});
    };

    setChartData = (chartData, type) => {
        let key = 0;
        for (let prop in this.state[type]) {
            if (this.state[type].hasOwnProperty(prop)) {
	            key = prop;
	            chartData[key][type] = this.state[type][prop];
            }
        }
        // console.log('KEY: ', key);
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

    render() {

        let chart = [];
        chart = this.setTimeKeys(chart);
        chart = this.setChartData(chart,'connected');
        chart = this.setChartData(chart,'visitors');
	    chart = this.setChartData(chart,'passerby');

        return (
            <div>
                <Grid container direction={"row"} className={"wrapper-sm-24"}>
                    <Grid item md={4} className={"wrapper-24"}><h3>Hourly connected</h3></Grid>
                </Grid>
                <ResponsiveContainer width="90%" height={500}>
                    <BarChart data={chart}>
                        <Bar type="monotone" dataKey="connected" fill="#00ff83" fillOpacity={0.8} />
                        <Bar type="monotone" dataKey="visitors" fill="#ff0043" fillOpacity={0.8} />
                        <Bar type="monotone" dataKey="passerby" fill="#0069fc" fillOpacity={0.8} />
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="hour" height={60}/>
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} onClick={this.hideData}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default HourlyConnected;
