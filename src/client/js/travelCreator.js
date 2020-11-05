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
captureEvents
const today = new Date()

//import {defaultPic} from "../media/default.jpg"


let currentTrips = document.querySelectorAll('trip-container');

//const navbar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



function addNewTrip(data){
    const tripNumber = countAllTrips()+1
    let isDefault = false
    if(data==undefined || data==null){
        console.log("Using default data")
        data=getDefaultData();
        isDefault=true;
    }
    const tripContainer = document.getElementsByClassName("planned-trips-container")[0];
 
    let currentTrip = document.createElement('div');
    currentTrip.setAttribute('class','trip-container');
    currentTrip.setAttribute('data_ts', getTimeStamp(data.date));
    currentTrip.id = 'trip'+tripNumber;

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
    
    //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    const deltaDays = (new Date(data.date).getTime() -today.getTime())/ (1000 * 3600 * 24)
    
    const tripDelta  = document.createElement('div');
    tripDelta.setAttribute('class','trip-info');
    tripDelta.id = "trip-delta-"+tripNumber
    tripDelta.innerHTML = deltaDays>0?("In "+Math.ceil(deltaDays)+" days"):+Math.ceil(deltaDays)==0?"Have a nice trip today!":("You left "+Math.floor(-deltaDays)+" days ago")

    const tripWeather  = document.createElement('div');
    tripWeather.setAttribute('class','trip-info');
    tripWeather.id = "trip-weather-"+tripNumber
    tripWeather.innerHTML = "Expected temperature is "+data.weather+ " °C"

    tripRight.appendChild(tripDest)
    tripRight.appendChild(tripDate)
    tripRight.appendChild(tripDelta)
    tripRight.appendChild(tripWeather)

    tripContainer.append(currentTrip);   
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
function countAllTrips(){
    return document.getElementsByClassName('trip-container').length
}
// Add class 'active' to section when near top of viewport

/**
 * We iterate over all sections, only the one in top of viewport is defined as the active
 * section, and we modify the navigation bar accordingly
 */
function makeSectionActive(){
    for(let sect of currentTrips){
        // By default, no class attribute for the section
        sect.setAttribute('class','')

        // We search for the corresponding navigation item
        const myListItem = navbar.querySelector('#button'+sect.id);
        myListItem.setAttribute('class','')

        // Detecting active section
        const currentBox = sect.getBoundingClientRect();
        const isActive = currentBox.top<=150 && currentBox.bottom>=150;

        // Setting "active class" for the section and the item in the navigation menu
        if(isActive){
            sect.setAttribute('class','your-active-class');
            const activeListItem = document.querySelector('navbar__menu');
            myListItem.setAttribute('class','navbar__li__active')
        }
    }
}


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click => event added at navbar creation in createNavBar

// Set sections as active

//document.addEventListener("scroll",makeSectionActive)


export{addNewTrip,clearAllTrips,countAllTrips}