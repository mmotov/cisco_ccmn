import axios from 'axios/index';
import config from '../../config.js'

const siteId = 1513804707441;
const baseUrl = config.presence;
// const header = 'Base Uk86UGFzc3cwcmQ=';

function getHeader(){
  let header = (JSON.parse(localStorage.getItem('cisco_auth'))).presense;
  return header;
}


export function presenceRequest(passUrl) {
    let url = baseUrl + passUrl;
    let headers = {
            headers: {
                Authorization: getHeader()
            },
            params: {
                siteId: siteId
            }
        };
    return new Promise((resolve, reject) => {
        axios.get(url, headers)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function visitorsToday() {
    let url = baseUrl + 'api/presence/v1/visitor/count/today';
    let headers = {
            headers: {
                Authorization: getHeader()
            },
            params: {
                siteId: siteId
            }
        };
    return new Promise((resolve, reject) => {
        axios.get(url, headers)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function visitorsHourlyToday() {
    let url = baseUrl + 'api/presence/v1/connected/hourly/today';
    let headers = {
        headers: {
            Authorization: getHeader()
        },
        params: {
            siteId: siteId
        }
    };

    return new Promise((resolve, reject) => {
        axios.get(url, headers)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
