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
            visitors: []
        };
        this.getChartData = this.getChartData.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

        this.setState({date: nextProps.queryParams.date});
        this.fetchVisitors(nextProps.queryParams.date);
        // let query =  {
        //     date: nextProps.queryParams.date
        // };
        // visitorsHourly(query)
        //     .then((result) => {
        //         this.setState({visitors: result});
        //     });
    }

    fetchVisitors = (date) => {
        let request = getPresenceParams();
        request.data.params.date = date;
        console.log('Request: ', request);
        axios.get(request.baseUrl + 'api/presence/v1/connected/hourly', request.data)
            .then((result) => {
                this.setState({visitors: result.data});
            })
            .catch((error) => {
                console.log(error);
            });
    };


    getChartData() {
        let chartData = [];
        let lastProp = 0;
        for (let prop in this.state.visitors) {
            if (this.state.visitors.hasOwnProperty(prop)) {
                let object = {};
                object.hour = prop < 10 ? '0' + prop + ':00' : prop + ':00';
                object.connected = this.state.visitors[prop];
                chartData.push(object);
                lastProp = prop;
            }
        }
        lastProp++;
        while (lastProp < 24) {
            let object = {};
            object.hour = lastProp < 10 ? '0' + lastProp + ':00' : lastProp + ':00';
            chartData.push(object);
            lastProp++;
        }
        console.log('Chart: ', chartData);
        return chartData;
    }

    render() {
        let chartData = this.getChartData();
        return (
            <div>
                <div className={"wrapper-48"}><h3>Hourly connected visitors</h3></div>
                <ResponsiveContainer width="90%" height={500}>
                    <AreaChart data={chartData}>
                        <Area type="monotone" dataKey="connected" stroke="#8884d8" />
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
