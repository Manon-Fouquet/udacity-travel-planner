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
    test('Test geoNames fetch Mexico coordinates',()=>{
        const url = getGeoNamesURL(44.1,-9.9,-22.4,55.2,geoNamesId);
        return fetch(url).then(res=>res.json())
        .then(data=>{
            const cityName = data.geonames[0].name;
            expect(cityName).toBe('Mexico City');
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
