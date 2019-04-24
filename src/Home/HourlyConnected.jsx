import React, { Component } from 'react';
import { visitorsHourlyToday } from '../requests/presence/visitors';
import { LineChart, Line } from 'recharts';

class HourlyConnected extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], };
        this.buildDataForChart = this.buildDataForChart.bind(this);
    }

    componentDidMount() {
        visitorsHourlyToday()
            .then((result) => {
                this.setState({data: result});
                console.log(result);
            });
    }

    buildDataForChart() {
        
    }

    render() {

        return (
            <div>
                HELLO WORLD
                <LineChart width={400} height={400} data={this.state.data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                </LineChart>
            </div>
        );
    }
}

export default HourlyConnected;