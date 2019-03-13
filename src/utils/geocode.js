const request=require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2FwaTEiLCJhIjoiY2pzd3o3ZXNpMGtlaTQzcGp5cDRueXJnciJ9.MCgQnlIUTTf4PemCbT5rEw'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location,try different search', undefined)
        }
        else
        {   console.log("fetched geocode")
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name,
            })
        }
    })
}

module.exports=geocode