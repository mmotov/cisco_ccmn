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
        let ind = 0
        this.state.users.map((item) => {
            if (this.props.floor == item.mapInfo.floorRefId) {
                if (ind === 0) {
                    this.setState(prevState => ({
                        current: [item]
                    }));
                } else {
                    this.setState(prevState => ({
                        current: [...prevState.current, item]
                    }));
                }
            }
            ind++;
        });
    }

    componentWillReceiveProps(nextProps) {
        let ind = 0
        this.setState({
            scaleWidth: this.scaleWidth(nextProps.src, nextProps.width),
            scaleHeight: this.scaleHeight(nextProps.src, nextProps.height),
        })
        this.state.users.map((item) => {
            if (nextProps.floor == item.mapInfo.floorRefId) {
                if (ind === 0) {
                    this.setState(prevState => ({
                        current: [item]
                    }));
                } else {
                    this.setState(prevState => ({
                        current: [...prevState.current, item]
                    }));
                }
            }
            ind++;
        });
    }

    componentDidMount() {
        let url = config.location + "api/location/v2/clients";
        let header = (JSON.parse(localStorage.getItem('cisco_auth'))).location
        axios.get(url, {
            headers: {
                Authorization: header,
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({
                users: res.data,
            }, this.updateCurent);
        }).catch(error => {
            console.log(error)
        });
    }

    componentWillMount(){
        console.log(111111)
        this.setState({
            scaleWidth: this.scaleWidth(this.props.src, this.props.width),
            scaleHeight: this.scaleHeight(this.props.src, this.props.height),
        })
    }

    scaleWidth(src, width){
        let image = new Image();
        image.src = src;
        let image2 = new Image();
        image2.src = src;
        console.log(image.src)
        console.log(image.width)
        console.log(image2.width)
        console.log(width / image.width)
        return (width / image.width);
    }

    scaleHeight(src, height){
        let image = new window.Image();
        image.src = src;
        return (height / image.height);
    }

    render() {      
        return (
            <Layer>
                <URLImage src={this.props.src} x={0} y={0} width={this.props.width} height={this.props.height} />
                {this.state.current.map((item, ind) => {
                    return (<Rect
                        key={ind}
                        x={item.mapCoordinate.x * this.state.scaleWidth}
                        y={item.mapCoordinate.y * this.state.scaleHeight}
                        width={10}
                        height={10}
                        fill="green"
                        onClick={this.handleClick}
                    />);
                })}
            </Layer>
        );
    }
}

export default UsersLocation;