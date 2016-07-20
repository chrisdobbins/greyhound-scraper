'use strict';
const requestPromise = require('request-promise'),
      getStations = require('./get-stations'),
      getTrips = require('./get-trips');

main();

function main() {
    let originStationName = process.argv[2],
        destinationStationName = process.argv[3],
        departureDate = process.argv[4],
        arrivalDate = process.argv[5];

    Promise.all([getOriginInfo(originStationName),
                getDestinationInfo(destinationStationName)]).then(data => {
                    getTrips(data[0], data[1], departureDate, arrivalDate).then(data => {
                        const departures = data.DepartureSchedules.map(currentVal => {
                            let departureInfo = {departureStation: currentVal.DepartureStation,
                                arrivalStation: currentVal.ArrivalStation,
                                departureDateTime: currentVal.DepartureDateTime,
                                arrivalDateTime: currentVal.ArrivalDateTime,
                                duration: convertToMinutes(currentVal.Duration)
                            };
                            return departureInfo;
                        });
                        let trips = {
                            departures,
                            returns: data.ReturnSchedules
                        };
                        console.log(trips.departures);
                    }).catch(data => {
                        console.log(data);
                    });
                });

}

function convertToMinutes(time) {
    let timeArr,
        days = 0,
        hoursAndMinutes;
    if (time.split('.').length > 1) {
        timeArr = time.split('.');
        days = parseInt(timeArr[0]);
        hoursAndMinutes = timeArr[1].split(':');
    } else {
        hoursAndMinutes = time.split(':')
    }
    return (days * 24 * 60) + (parseInt(hoursAndMinutes[0]) * 60) + parseInt(hoursAndMinutes[1]);
}
function getOriginInfo(origin) {
    return getStations.searchByName(origin).then(data => {
        return data[0];
    });
}

function getDestinationInfo(destination) {
    return getStations.searchByName(destination).then(data => {
        return data[0];
    });
}
