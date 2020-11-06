import {addNewTrip} from './travelCreator'
import { checkValidDate,getTimeStamp,getDefaultData,sortTrips} from './client_utils'


const today = new Date()


async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    // If test or empty, reset with default text
    let city = document.getElementById('input-city').value
    let date = document.getElementById('input-date').value

    console.log("::: Running handleSubmit with city "+city+ " and "+date+":::");
    if(checkSubmittedData(city,date)){
      const data = retrieveData(city,date) 
      //TODO : sortTrips();
    } 
    
}

// Returns true if no issue, else alert the user
function checkSubmittedData(city,date){
  const dateIfOk = checkValidDate(date)
  if(dateIfOk==null){
    alert("The date input ("+date+") should be in format MM/DD/YYYY")
    return false
  }else{
    console.log("Input date is: "+dateIfOk)
  }
   if(city==""){
    alert("Please input a city name")
    return false
  }
 
  return true
}

function  retrieveData(city,dateString){
  //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
  let deltaDays = Math.ceil((new Date(dateString).getTime() -today.getTime())/ (1000 * 3600 * 24))
  console.log("Travel in "+deltaDays+ " days")
  fetch('http://localhost:8089/addNewTrip', 
    {
        credentials: 'same-origin',
        method: 'POST',
        headers: 
        {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({city: city, date:dateString, delta:deltaDays})
    })
      .then(res => res.json())
      .then(res=> 
      {
        console.log('Received data for new trip: '+JSON.stringify(res));
        addNewTrip(res,deltaDays) ;
        return res;
      })  
}

    

export { handleSubmit,retrieveData}