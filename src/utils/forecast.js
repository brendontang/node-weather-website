const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/b8d66855b47fb07becb1ca3c80e3d7fd/'+ lat + ',' + long 
    // request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        // } else if (response.body.error) {
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // callback(undefined, response.body.daily.data[0].summary + " It is currrently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
            callback(undefined, body.daily.data[0].summary + " It is currrently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain. Also, the humidity is " + body.daily.data[0].humidity)

        }
    })

}

module.exports = forecast
