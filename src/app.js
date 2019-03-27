// path is a core node module, so no need to install it
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// after installing hbs, create a views folder where the package.json is located and put index.hbs inside to use 
app.set('view engine', 'hbs')
// by default you have to use views folder to store hbs, this allows you to specify name of the path, in this case, templates
app.set('views', viewPath)
// for dynamic header and footer pgs
hbs.registerPartials(partialsPath)


// points to the public directory that allows me to serve a static html page
app.use(express.static(publicDirectoryPath))

// for index.hbs file. empty str for first parameter means homepage.
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Brendon'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Brendon'
    
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help page.',
        title: 'Help',
        name: 'Brendon'
    
    })
})

// wont work anymore if we use a static page that points to the main domain page
// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Brendon'
//     }, {
//         name: 'Sarah'
    
//     }])
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

// static json file with /weather path in the url
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        } 
        // forecast(data.latitude, data.longitude, (error, forecastData) => {
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            // console.log(data.location)
            res.send({
                forecast: forecastData,
                // location: location,
                location,
                address: req.query.address
            })
        })
           
           
        })
    })


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brendon',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brendon',
        errorMessage: 'Page not found.'
    })
})

app.listen(8080, () => {
    console.log('Server is up on port 8080.')
})