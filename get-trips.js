'use strict';
const requestPromise = require('request-promise');

function getTrip(origin, destination, departOn, returnOn) {
    const options = {
        uri: 'https://pegasus.greyhound.com/GhWebsite/schedules',
        qs: {
            originCode: origin.LocationCode,
            destinationCode: destination.LocationCode,
            departOn,
            returnOn: (returnOn ? returnOn : ''),
            adults: 1,
            adultWheelchairs: 0,
            children: 0,
            childWheelchairs: 0,
            seniorWheelchars: 0,
            discountCode: '',
            originStateAbbreviation: origin.StateAbbreviation,
            destinationStateAbbreviation: destination.StateAbbreviation,
            originStateCode: origin.StateCode,
            destinationStateCode: destination.StateCode
        },
        json: true
    }

    return new Promise((resolve, reject) => {
        return requestPromise(options).then(data => {
            resolve(data.Data);
        }).catch(() => {
            reject();
        });
    });
}

module.exports = getTrip;
