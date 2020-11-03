import {getGeoNamesURL,getPixaBayURL} from './server_utils.js'

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
            const lat = data.geonames[0].lat;
            const long = data.geonames[0].lng;
            expect(lat).toBe("48.68439");
            expect(long).toBe("6.18496");
            })
        }),

        
    test('Test pixabay fetch Paris picture',()=>{
        const url = getPixaBayURL("Paris",pixaBayId);
        return fetch(url).then(res=>res.json())
        .then(data=>{
            
            const pictureURL = data.hits[0].webformatURL;
            console.log("pictureURL : "+pictureURL);
            new URL(pictureURL);
            })
        })
    
    }
    );
