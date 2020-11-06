//import {addNewTrip,clearAllTrips,countAllTrips} from './travelCreator.js'
import {getTimeStamp} from './client_utils'


describe('Test the API responses' , ()=>
{
    /* Disabled for now, need to get the document 
from page
test('Test addTravelContainer',()=>{
    clearAllTrips()

    for(let i=0;i<=3;i++){
        console.log("Adding new trip #"+i)
        addNewTrip(null);
        expect(countAllTrips).toBe(4);
     
    }
    
    }),
    */
    test('Test timestamp',()=>{
        const dateString = '2021-01-31'
        //const dateIfOk = checkValidDate(dateString)
        const timeStamp = getTimeStamp(dateString)
        console.log("time stamp = "+timeStamp)
        expect(timeStamp).toBe(1612047600000)
    })
})

