import React, { Component } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { visitorsHourly } from '../requests/presence/visitors';
import { getPresenceParams } from '../requests/credentials';
import axios from "axios";

class HourlyConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.queryParams.date,
            visitors: [],
	        passerby: []
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

        this.setState({date: nextProps.queryParams.date});
	    this.fetchVisitors(nextProps.queryParams.date);
	    this.fetchPasserby(nextProps.queryParams.date);
    }

	fetchVisitors = (date) => {
		let request = getPresenceParams();
		request.data.params.date = date;
		axios.get(request.baseUrl + 'api/presence/v1/connected/hourly', request.data)
			.then((result) => {
				this.setState({visitors: result.data});
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


    setChartData = (chartData, type) => {
        let key = 0;
        for (let prop in this.state[type]) {
            if (this.state[type].hasOwnProperty(prop)) {
	            key = prop;
	            chartData[key][type] = this.state[type][prop];
            }
        }
        console.log('KEY: ', key);
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
        console.log('Chart: ', chart);
        chart = this.setChartData(chart,'visitors');
	    chart = this.setChartData(chart,'passerby');

        return (
            <div>
                <div className={"wrapper-48"}><h3>Hourly connected</h3></div>
                <ResponsiveContainer width="90%" height={500}>
                    <AreaChart data={chart}>
                        <Area type="monotone" dataKey="visitors" stroke="#f41111" />
	                    <Area type="monotone" dataKey="passerby" stroke="#4286f4" />
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="hour" height={60}/>
                        <YAxis />
                        <Tooltip />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default HourlyConnected;
