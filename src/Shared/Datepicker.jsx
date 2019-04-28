import React, {Component} from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import TextField from '@material-ui/core/TextField';
// import {FormControl} from 'react-bootstrap';
import moment from "moment";
import {withStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";


const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        // minWidth: 120,
        width: "100%"
    },
});


class Datepicker extends Component {

    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        let startStr = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
        let date = new Date();
        date.setTime(end);
        let endStr = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

        this.state = {
            start : start,
            end : end,

            startStr : startStr,
            endStr : endStr
        };

        this.applyCallback = this.applyCallback.bind(this);
    }

    applyCallback(startDate, endDate){

        let sDate = new Date();
        sDate.setTime(startDate);
        let startStr = sDate.getFullYear() + '-' + sDate.getMonth() + '-' + sDate.getDate();

        let eDate = new Date();
        eDate.setTime(endDate);
        let endStr = eDate.getFullYear() + '-' + eDate.getMonth() + '-' + eDate.getDate();

        this.setState({
                start: startDate,
                end : endDate,
                startStr: startStr,
                endStr: endStr
            }
        )
    }

    render(){
        const { classes } = this.props;

        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)]
        };
        let local = {
            "format":"DD-MM-YYYY",

        };
        let maxDate = moment(start).add(24, "hour")
        return(
            <DateTimeRangeContainer
                ranges={ranges}
                start={this.state.start}
                end={this.state.end}
                local={local}
                maxDate={maxDate}
                applyCallback={this.applyCallback}
            >
                <FormControl className={classes.formControl}>
                    <TextField
                        value={this.state.startStr + ' - ' + this.state.endStr}
                    />
                </FormControl>
            </DateTimeRangeContainer>
        );
    }
}

export default withStyles(styles)(Datepicker);