const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYnRhbmdvIiwiYSI6ImNqdGZveWNkczBkaTc0M21nbGd4am45NTYifQ.3KFy87uSj5VLJk34Scbpew&limit=1'

    // request({ url: url, json: true}, (error, response) => {
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        //  } else if (response.body.features.length === 0) {
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                // latitude: response.body.features[0].center[1],
                // longitude: response.body.features[0].center[0],
                // location: response.body.features[0].place_name
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
    }

})
}

// const url = 'https://api.darksky.net/forecast/b8d66855b47fb07becb1ca3c80e3d7fd/37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//          console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
//     }
   
// })

module.exports = geocode