const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const publicDirectory = path.join(__dirname, "../public")
const viewDirectory = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
const app = express();
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "kapil"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About ME",
        name: "kapil"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        msg: "Help unavailable",
        title: "HELP",
        name: "kapil"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData, temp, tempHigh, tempLow) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                temp,
                tempHigh,
                tempLow
            })
        })
    })
})


app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "404 not found"
    })

})

app.listen(port, () => {
    console.log("server up! " + port)
})