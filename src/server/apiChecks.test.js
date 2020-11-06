import {getGeoNamesURL,getGeoNamesCoordinates,getPixaBayURL,getHistoricalWeatherBitURL,getWeatherBitForecastURL,getPictureURL} from './server_utils.js'

// Load environment variables, especially API keys
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

const pixaBayId = process.env.PIXABAY_KEY
const weatherBitId = process.env.WEATHERBIT_KEY
const geoNamesId = process.env.GEONAMES_KEY

describe('Test the API responses' , ()=>
    {
    test('Test geoNames fetch Nancy coordinates',()=>{
        const url = getGeoNamesURL('Nancy',geoNamesId);
        return fetch(url).then(res=>res.json())
        .then(data=>{
            const res = getGeoNamesCoordinates(data)
            expect(res.lat).toBe("48.68439");
            expect(res.long).toBe("6.18496");
            })
        }),

        
    test('Test pixabay fetch Paris picture',()=>{
        const url = getPixaBayURL("Paris",pixaBayId);
        return fetch(url).then(res=>res.json())
        .then(data=>{
            new URL(getPictureURL(data));
            })
        }),

    test('Test pixabay fetch no picture',()=>{
            const url = getPixaBayURL("sksjfkjslfzeijfdsv",pixaBayId);
            return fetch(url).then(res=>res.json())
            .then(data=>{            
                expect(getPictureURL(data)).toBe("")
                })
     }),

    test('Test weatherbit API for average historical weather',()=>{
            const url = getHistoricalWeatherBitURL("48.68439","6.18496",'02/08/2021',weatherBitId)
            return fetch(url).then(res=>res.json())
            .then(resJSON=>{
                if(resJSON.error==undefined){
                    expect(resJSON.data[0].temp).toBe(3)
                }else{
                  expect(resJSON.error).toBe("API key not valid, or not yet activated.")
                }
                })
        }),

    test('Test weatherbit API for weather forecast',()=>{
        const url = getWeatherBitForecastURL("48.68439","6.18496",weatherBitId)
        return fetch(url).then(res=>res.json())
        .then(resJSON=>{
            expect(resJSON.data[0].valid_date).not.toBe(undefined)
            console.log("Weatherbit temp. forecast for: "+resJSON.data[0].valid_date+ " is ["+resJSON.data[0].low_temp+" °C , "+resJSON.data[0].high_temp+" °C]")
            })
        })      
    }


    );
