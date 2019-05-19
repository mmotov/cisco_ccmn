import React from 'react';
import axios from 'axios/index';
import config from '../config.js';
import URLImage from './URLImage.jsx';
import { Layer, Rect } from 'react-konva';

class UsersLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            current: [],
            imgWidth: "",
            imgHeight: "",
            macAddr: [],
            interval: undefined
        }
        this.scaleWidth = this.scaleWidth.bind(this);
        this.scaleHeight = this.scaleHeight.bind(this);
    }

    updateCurent = () => {
        this.setState({
            current: [],
        }, function () {
            this.state.users.map((item) => {
                if (this.props.floor === item.mapInfo.floorRefId) {
                    this.setState(prevState => ({
                        current: [...prevState.current, item]
                    }));
                }
            })
        });
    }

    async componentWillReceiveProps(nextProps) {
        let width = await this.scaleWidth(nextProps.src, nextProps.width);
        let height = await this.scaleHeight(nextProps.src, nextProps.height);
        this.setState({
            scaleWidth: width,
            scaleHeight: height,
        })
        this.setState({
            current: [],
        }, function () {
            this.state.users.map((item) => {
                if (nextProps.floor === item.mapInfo.floorRefId) {
                    this.setState(prevState => ({
                        current: [...prevState.current, item]
                    }));
                }
            })
        });

    }

    diplayNotification = (data) => {
        let arrA = Array.from(data, item => item.macAddress);
        let arrB = this.state.macAddr
        let difference = arrA.filter(x => !arrB.includes(x));
        console.log(difference);
        if (difference.length < 10 && difference.length != 0){
            this.props.notification("new " + difference.join(" "))
        } 
    }

    request = () => {
        
        let url = config.location + "api/location/v2/clients";
        let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
        let upper = this
        axios.get(url, {
            headers: {
                Authorization: header,
            }
        }).then((res) => {
            upper.props.updateParam("allUser", res.data)
            // console.log(res.data)
            this.diplayNotification(res.data)
            this.setState({
                users: res.data,
                macAddr: Array.from(res.data, item => item.macAddress)
            }, this.updateCurent);
        }).catch(error => {
            console.log(error)
        });
    }

    componentDidMount() {
        this.request();
        this.setState({interval: setInterval(this.request, 10000)});
    }

    componentWillUnmount() {

        clearInterval(this.state.interval);
    }

    async componentWillMount() {
        let width = await this.scaleWidth(this.props.src, this.props.width);
        let height = await this.scaleHeight(this.props.src, this.props.height);
        this.setState({
            scaleWidth: width,
            scaleHeight: height,
        })
    }

    scaleWidth(src, width) {
        let image = new Image();
        image.src = src;
        return new Promise((resolve, reject) => {
            image.onload = function () {
                resolve(width / image.width);
            };
        });
    }

    scaleHeight(src, height) {
        let image = new window.Image();
        image.src = src;
        return new Promise((resolve, reject) => {
            image.onload = function () {
                resolve(height / image.height);
            };
        });
    }

    // showInfo = (x, y) => e =>{
    //     this.state.current.map((item) => {
    //         if (item.mapCoordinate.x == x && item.mapCoordinate.y == y){
    //             console.log(item.manufacturer, item.userName, item.macAddress)
    //         }
    //     })
    // }

    render() {
        return (
            <Layer>
                <URLImage src={this.props.src} x={0} y={0} width={this.props.width} height={this.props.height} />
                {this.state.current.map((item, ind) => {
                    let color = "green";
                    let founded = 1;
                    if (this.props.redDot && this.props.redDot.mapCoordinate.x ===item.mapCoordinate.x &&
                        this.props.redDot.mapCoordinate.y === item.mapCoordinate.y){
                            color = "red";
                            founded = 1.5;
                        }
                        
                    return (<Rect
                        titile="lol"
                        key={ind}
                        x={item.mapCoordinate.x * this.state.scaleWidth}
                        y={item.mapCoordinate.y * this.state.scaleHeight}
                        width={(this.props.width/140) * founded}
                        height={(this.props.width/140) * founded}
                        fill={color}
                        onClick={this.props.showInfo(item.mapCoordinate.x, item.mapCoordinate.y)}
                    />);
                })}
            </Layer>
        );
    }
}

export default UsersLocation;