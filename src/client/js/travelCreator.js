import { checkValidDate,getTimeStamp,getDefaultData} from './client_utils'


/**
 * 
 * Create and append a new travel
 * 
*/

/**
 * Define Global Variables
 * 
*/
let currentTrips = document.querySelectorAll('trip-container');

//const navbar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



function addNewTrip(data,deltaDays,maxDaysForForecast=7){
    const tripNumber = countAllTrips()+1
    let isDefault = false
    if(data==undefined || data==null){
        console.log("Using default data")
        data=getDefaultData();
        isDefault=true;
    }
   
    const tripContainer = document.getElementsByClassName("planned-trips-container")[0];
 
    let currentTripBox = document.createElement('div');
    currentTripBox.setAttribute('class','trip-container-box');
    currentTripBox.id = 'trip'+tripNumber;
    tripContainer.append(currentTripBox);   
    
    let closeBar = document.createElement('div');
    closeBar.setAttribute('class','close-bar');
    currentTripBox.append(closeBar)

    let trashButton = document.createElement('div');
    trashButton.setAttribute('class','trash-button');
    trashButton.setAttribute('data_id',tripNumber);
    trashButton.setAttribute('onclick',"return Client.removeTrip(event)");
    closeBar.append(trashButton);
  

    let currentTrip = document.createElement('div');
    currentTrip.setAttribute('class','trip-container');
    currentTripBox.append(currentTrip);

    currentTrip.setAttribute('data_ts', getTimeStamp(data.date));
    

    const tripLeft = document.createElement('div');
    tripLeft.setAttribute('class','trip-left');
    const tripImg = document.createElement('img');
    tripImg.setAttribute('src',data.img==""?'../media/default.jpg':data.img)  
    tripImg.setAttribute('alt',data.img)
    tripLeft.appendChild(tripImg)

    const tripRight = document.createElement('div');
    tripRight.setAttribute('class','trip-right');
    
    currentTrip.appendChild(tripLeft);
    currentTrip.appendChild(tripRight);

    const tripDest = document.createElement('div');
    tripDest.setAttribute('class','trip-title');
    tripDest.id = "trip-dest-"+tripNumber
    tripDest.innerHTML = "Your travel to: "+data.city

    const tripDate  = document.createElement('div');
    tripDate.setAttribute('class','trip-title');
    tripDate.id = "trip-date-"+tripNumber
    // date has been validated previously
    tripDate.innerHTML = "Departing: "+data.date
    
      
    const tripDelta  = document.createElement('div');
    tripDelta.setAttribute('class','trip-info');
    tripDelta.id = "trip-delta-"+tripNumber
    tripDelta.innerHTML = deltaDays>0?("In "+Math.ceil(deltaDays)+" day"+(deltaDays>1?"s":"")):Math.ceil(deltaDays)==0?"Have a nice trip today!":("You left "+Math.floor(-deltaDays)+" day"+(deltaDays>1?"s":"")+" ago")

    const tripWeather  = document.createElement('div');
    tripWeather.setAttribute('class','trip-info');
    tripWeather.id = "trip-weather-"+tripNumber
    if(deltaDays>=0 && deltaDays<Math.min(maxDaysForForecast,15)){
        tripWeather.innerHTML = "The weather forecast is min: "+data.minTemp+ " °C, max: "+data.maxTemp+" °C"
    }else{
        
        tripWeather.innerHTML = "Typical temperature for this date is min: "+data.minTemp+ " °C, max: "+data.maxTemp +" °C"
    }

    tripRight.appendChild(tripDest)
    tripRight.appendChild(tripDate)
    tripRight.appendChild(tripDelta)
    tripRight.appendChild(tripWeather)

    
}

// Removes all trips in the container
function clearAllTrips(){
    const tripContainer = document.getElementsByClassName("planned-trips-container")[0];
    while (tripContainer.firstChild) {
        tripContainer.removeChild(tripContainer.lastChild);
    }
    return false;
}

// Count how many trips are displayed in container
function getAllTrips(){
    return document.getElementsByClassName('trip-container-box')
}
function countAllTrips(){
    return getAllTrips().length
}

function removeTrip(event){
    const tripId=event.target.getAttribute('data_id');
    console.log("Removing trip "+tripId)
    var element = document.getElementById("trip"+tripId)
    element.parentNode.removeChild(element);
}


export{addNewTrip,clearAllTrips,countAllTrips,removeTrip}