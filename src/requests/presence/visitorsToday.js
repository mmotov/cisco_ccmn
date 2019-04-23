import axios from 'axios/index';

// https://cisco-presence.unit.ua/api/config/v1/version/image

export function visitorsToday() {
    let BaseUrl = 'https://cisco-presence.unit.ua/api/presence/v1/visitor/count/today';
    // let BaseUrl = 'https://cisco-presence.unit.ua/api/config/v1/sites';
    // let data = {siteId: 1513804707441};
    let headers = {
            headers: {
                // Authorization: 'Base Uk86anVzdDRyZWFkaW5n'
                Authorization: 'Base Uk86UGFzc3cwcmQ='
            },
            params: {
                siteId: 1513804707441
            }
        };
    return new Promise((resolve, reject) => {
        axios.get(BaseUrl, headers)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
