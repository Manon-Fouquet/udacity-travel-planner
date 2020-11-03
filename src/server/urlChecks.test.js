import {getGeoNamesURL, getPixaBayURL} from './server_utils.js'

// Load environment variables, especially API keys
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

const pixaBayId = process.env.PIXABAY_KEY
const weatherBitId = process.env.WEATHERBIT_KEY
const geoNamesId = process.env.GEONAMES_KEY

describe('Test the url formats' , ()=>
    {
        test('Test bad URL created',()=>{
            let expectedFailure = false;
            try{
            new URL('https://url with some space');
            }catch(error){
                expectedFailure=true;
            }
            return expect(expectedFailure).toBe(true)
        }),

        test('Test geoNames URL',()=>{
        let url = getGeoNamesURL("Nancy",geoNamesId);
        expect(url).toBeDefined();
        new URL(url)
        expect(url).toBe('http://api.geonames.org/searchJSON?q=Nancy&maxRows=1&username='+geoNamesId);
        }),

    test('Test pixaBay URL',()=>{
        let url = getPixaBayURL("Paris",pixaBayId);
        expect(url).toBeDefined();
        new URL(url)
        expect(url).toBe('https://pixabay.com/api/?key='+pixaBayId+'&q=Paris&image_type=photo&category=places&min_width=100px&min_height=100px&pretty=true');
        })

    });
