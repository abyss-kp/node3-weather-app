const request = require('request')
const forecast = (long, lat, callback) => {
    const url = "https://api.darksky.net/forecast/60da98cf84d1a950e397e397e75145ef/" + lat + "," + long + "?unit=si";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temp = parseInt(((parseInt(body.currently.temperature) - 32) * 5) / 9);
            const tempHigh = parseInt(((parseInt(body.daily.data[0].temperatureHigh) - 32) * 5) / 9);
            const tempLow = parseInt(((parseInt(body.daily.data[0].temperatureLow) - 32) * 5) / 9);
            callback('', "It is currently " + temp +
                "℃  out and the high today is " + tempHigh +
                " ℃ with a low of " + tempLow +
                " ℃ . There are " + body.currently.precipProbability +
                "% chances of rain")
        }
    })
}

module.exports = forecast