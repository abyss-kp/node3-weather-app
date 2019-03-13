const request = require('request')
const forecast = (long, lat, callback) => {
    const url = "https://api.darksky.net/forecast/60da98cf84d1a950e397e397e75145ef/" + lat + "," + long + "?unit=si";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const degreeC = parseInt(((parseInt(body.currently.temperature) - 32) * 5) / 9);
            callback('', "It is currently " + degreeC +
                " degree Celcius out there and there are " + body.currently.precipProbability +
                " chances of rain")
        }
    })
}

module.exports = forecast