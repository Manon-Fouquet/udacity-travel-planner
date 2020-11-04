import {addNewTrip} from './travelCreator'

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    // If test or empty, reset with default text
    let city = document.getElementById('input-city').value
    let date = document.getElementById('input-date').value

    console.log("::: Running handleSubmit with city "+city+ " and "+date+":::");
    const data = retrieveData(city,date)  

}

function  retrieveData(city,date){
    fetch('http://localhost:8089/addNewTrip', 
    {
        credentials: 'same-origin',
        method: 'POST',
        headers: 
        {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({city: city, date:date})
    })
      .then(res => res.json())
      .then(res=> 
      {
        console.log('Received data for new trip: '+JSON.stringify(res));
        addNewTrip(1,res) ;
        return res;
      })  
}

    

export { handleSubmit,retrieveData}