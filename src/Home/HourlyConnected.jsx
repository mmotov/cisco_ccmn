import React, { Component } from 'react';
import { visitorsHourlyToday } from '../requests/presence/visitors';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

class HourlyConnected extends Component {

    constructor(props) {
        super(props);
        this.state = { data: {}, };
        this.getChartData = this.getChartData.bind(this);
    }

    componentDidMount() {
        visitorsHourlyToday()
            .then((result) => {
                this.setState({data: result});
                console.log(result);
            });
    }


    getChartData() {
        let chartData = [];
        let lastProp = 0;
        for (let prop in this.state.data) {
            if (this.state.data.hasOwnProperty(prop)) {
                let object = {};
                object.hour = prop < 10 ? '0' + prop + ':00' : prop + ':00';
                object.connected = this.state.data[prop];
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
        console.log(chartData);
        return chartData;
    }

    render() {
        let chartData = this.getChartData();
        return (
            <div>
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
