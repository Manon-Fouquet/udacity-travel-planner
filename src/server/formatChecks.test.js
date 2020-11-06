import {getWeatherbitDays} from './server_utils.js'


describe('Test the date format for weatherbits API' , ()=>
    {
        test('Test for Climate Normals API same month (mm-dd)',()=>{
            let dateString='1989-02-08';
            let wbDays = getWeatherbitDays(dateString)
            expect(wbDays.today).toBe('02-08')
            expect(wbDays.tomorrow).toBe('02-09')
        }),

        test('Test for Climate Normals API month change(mm-dd)',()=>{
            let dateString='2020-01-31';
            let wbDays = getWeatherbitDays(dateString)
            expect(wbDays.today).toBe('01-31')
            expect(wbDays.tomorrow).toBe('02-01')
        })
    });