import axios from 'axios/index';

const siteId = 1513804707441;
const header = 'Base Uk86UGFzc3cwcmQ=';
const baseUrl = 'https://cisco-presence.unit.ua/';

export function visitorsToday() {
    let url = baseUrl + 'api/presence/v1/visitor/count/today';
    let headers = {
            headers: {
                Authorization: header
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
            Authorization: header
        },
        params: {
            siteId: siteId
        }
    };
    console.log('url: ', url);
    console.log('headers: ', headers);
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
