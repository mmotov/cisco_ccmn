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

    componentDidMount() {
        let url = config.location + "api/location/v2/clients";
        let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
        let upper = this
        axios.get(url, {
            headers: {
                Authorization: header,
            }
        }).then((res) => {
            upper.props.updateParam(res.data)
            this.setState({
                users: res.data,
            }, this.updateCurent);
        }).catch(error => {
            console.log(error)
        });
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

    render() {
        return (
            <Layer>
                <URLImage src={this.props.src} x={0} y={0} width={this.props.width} height={this.props.height} />
                {this.state.current.map((item, ind) => {
                    return (<Rect
                        titile="lol"
                        key={ind}
                        x={item.mapCoordinate.x * this.state.scaleWidth}
                        y={item.mapCoordinate.y * this.state.scaleHeight}
                        width={10}
                        height={10}
                        fill="green"
                    />);
                })}
            </Layer>
        );
    }
}

export default UsersLocation;