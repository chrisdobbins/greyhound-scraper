'use strict';

const requestPromise = require('request-promise');

function getStationsByState(state) {
    if (state.length < 3) {
        console.error('state must be at least 3 letters long');
        return;
    }

    const options = {
        method: 'GET',
        uri: 'https://pegasus.greyhound.com/GhWebsite/locations/locationsState',
        qs: {
            name: state
        },
        json: true
    };
    let stationsArr;
    return new Promise((resolve, reject) => {
        return requestPromise(options).then(data => {
            if (data.Data.length > 0) {
                resolve(data.Data);
            } else {
                reject('no data returned');
            }
        });
    });
}

function getStationsByName(name) {
    if (name.length < 3) {
        console.error('name must be at least 3 letters long');
    }
    const options = {
        method: 'GET',
        uri: 'https://pegasus.greyhound.com/GhWebsite/locations/locationsStation',
        qs: {
            name
        },
        json: true
    };
    return new Promise((resolve, reject) => {
        return requestPromise(options).then(data => {
            if (data.Data.length > 0) {
                resolve(data.Data);
            } else {
                reject('no data returned');
            }
        });
    });
}
module.exports = {
    searchByState: getStationsByState,
    searchByName: getStationsByName
};
