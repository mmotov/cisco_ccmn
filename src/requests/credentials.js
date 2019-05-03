import config from '../config.js'

const siteId = 1513804707441;

function getHeader(){
	return (JSON.parse(localStorage.getItem('cisco_auth'))).location;
}

export function getPresenceParams() {
	return {
		baseUrl: config.presence,
		data: {
			headers: { Authorization: getHeader()},
			params: {
				siteId: siteId
			}
		}
	};
}