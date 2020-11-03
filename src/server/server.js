
// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const port = 8089

const path = require('path')


// Require Express to run server and routes
const express = require('express')

// To be able to fetch external API from server side
const fetch = require('node-fetch');

//Parse incoming request bodies in a middleware before handlers
var bodyParser = require('body-parser')

// Cors for cross origin allowance
var cors = require('cors')

//provides request and get methods that behave identically to those found on the native http and https modules
const{http, https} = require('follow-redirects');

//File I/O is provided by simple wrappers 
var fs = require('fs');

// Start up an instance of app
const app = express()
app.use(cors())


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder                          
app.use(express.static('dist'))


// Load environment variables, especially API keys
const dotenv = require('dotenv');
dotenv.config();


const pixaBayId = process.env.PIXABAY_KEY
const weatherBitId = process.env.WEATHERBIT_KEY
const geoNamesId = process.env.GEONAMES_KEY

// Debug
console.log(`Your API keys are ${pixaBayId}, ${weatherBitId}, ${geoNamesId}`);
console.log("dirname : "+__dirname)

const getGeoNamesURL=require('server_utils')

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log('Example app listening on port '+port+'!')
})

app.get('/test', function (req, res) {
    const defaultRequest = mockAPIResponse
    res.json(defaultRequest)
})


app.post('/analyse', async function (req, res) {
    
    // Production mode: The user API key is retrieved from the .env file
    // Then we call the meaningcloud API with the API key and text input by the user
    // Finally we send the  process restult to the client side
    
    const url = getURL(req.body.formText)
    try{
        let response = await fetch(url)
        let data = await response.json()
        const toReturn ={}
        toReturn.subjectivity   = data.subjectivity    
        toReturn.irony          = data.irony    
        toReturn.agreement      = data.agreement    
        toReturn.confidence     = data.confidence 
        console.log("SERVER: returned result = "+toReturn.subjectivity)
        res.send(toReturn)
    }catch(error){   
        console.log("Could not fetch url "+url);
    }
})


/*
function getGeoNamesURL(longitude,latitude,apiKey){
    const url ="http://api.geonames.org/citiesJSON?north="+latitude+"&south="+latitude+"&east="+longitude+"&west="+longitude+"&lang=en&username="+apiKey
    console.log("SERVER: returned result = "+url)
    return  url
}

module.exports = {getGeoNamesURL}
*/