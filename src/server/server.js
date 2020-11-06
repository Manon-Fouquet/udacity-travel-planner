
// Setup empty JS object to act as endpoint for all routes
const projectData =[];

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

const  {getGeoNamesURL,getPixaBayURL,getHistoricalWeatherBitURL,getPictureURL, getWeatherBitForecastURL}=require('./server_utils')

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log('Example app listening on port '+port+'!')
})



app.post('/addNewTrip', async function (req, res) {
    
    // Production mode: The user API keys are retrieved from the .env file
    
    const toReturn =req.body
    try{

        // Retrieves coordinates from a city name
        //let response1 = await fetch(getGeoNamesURL(toReturn.city,geoNamesId))
        //let data = await response1.json()

        let data = await fetch(getGeoNamesURL(toReturn.city,geoNamesId))
                        .then(res=>res.json())
                        .then(res=>{
                            return (res.geonames.length>0? res.geonames[0]:null)
                        })

        if(data.lat==undefined ||data.lng==undefined){
            console.log("Cooordinates of "+toReturn.city+" not found. Fetching "+ getGeoNamesURL(toReturn.city,geoNamesId)+ " returned:")
            console.log(JSON.stringify(data))
            
        }else{
            console.log("Cooordinates of "+toReturn.city+" : (lat = "+data.lat+" , long = "+data.lng+")")
            if(toReturn.delta>=0 && toReturn.delta<7){
                let response2 = await fetch(getWeatherBitForecastURL(data.lat,data.lng,weatherBitId))
                let data2 = await response2.json()
                console.log("In "+toReturn.delta+" days : "+data2.data[toReturn.delta].low_temp +" °C / "+data2.data[toReturn.delta].high_temp+' °C' )
                toReturn.minTemp = data2.data[toReturn.delta].low_temp            
                toReturn.maxTemp = data2.data[toReturn.delta].high_temp
            } else{
                let response2 = await fetch(getHistoricalWeatherBitURL(data.lat,data.lng,req.body.date,weatherBitId))
                let data2 = await response2.json()
                toReturn.minTemp  = data2.data.length>0?data2.data[0].min_temp:JSON.stringify(data2)    
                toReturn.maxTemp  =  data2.data.length>0?data2.data[0].max_temp:JSON.stringify(data2)    
            }
            console.log("Min/Max temperature of "+toReturn.city+" for this date are: "+ toReturn.minTemp+" °C - "+toReturn.maxTemp+" °C") 
  
        }    
        
 
        // Retrieves a picture corresponding to the city
        let response3 =  await fetch(getPixaBayURL(toReturn.city,pixaBayId))
        let data3 = await response3.json()
        toReturn.img  = getPictureURL(data3);    
        projectData.push(toReturn)
        console.log(JSON.stringify(projectData))
        res.send(toReturn)
    }catch(error){   
        console.log("Error while adding new trip "+error);
    }
})
