/**
 * 
 * Create and append a new travel
 * 
*/

/**
 * Define Global Variables
 * 
*/

//import {defaultPic} from "../media/default.jpg"

const defaultCity = "Nancy";
const defaultDate = "01/01/2021";
const defaultData = {}


let currentTrips = document.querySelectorAll('trip-container');

//const navbar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function getDefaultData(){
    const defaultCity = "Nancy";
    const defaultDate = "01/01/2021";   
    const defaultWeather = "rainy";   
    const defaultDelta = "188";
    const defaultData = {}
    defaultData.city = defaultCity  
    defaultData.date = defaultDate  
    defaultData.delta = defaultDelta   
    defaultData.weather = defaultWeather
    defaultData.img = "default.jpg"
    return defaultData

}
/**
 * Helper function to append a new section with default text
 */

function addNewTrip(tripNumber,data){
    let isDefault = false
    if(data==undefined || data==null){
        console.log("Using default data")
        data=getDefaultData();
        isDefault=true;
    }
    const tripContainer = document.getElementsByClassName("planned-trips-container")[0];

    let currentTrip = document.createElement('div');
    currentTrip.setAttribute('class','trip-container');
    currentTrip.id = 'trip'+tripNumber;

    const tripLeft = document.createElement('div');
    tripLeft.setAttribute('class','trip-left');
    const tripImg = document.createElement('div');
    tripImg.setAttribute('class','trip-img')//isDefault?"default-trip-image":"trip-image")
    tripImg.setAttribute('src','https://pixabay.com/get/57e0d74b4e52b10ff3d8992cc6203e781739d9e04e507749712a79d5964ac4_640.jpg')
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
    tripDate.innerHTML = "Departing: "+data.date

    const tripDelta  = document.createElement('div');
    tripDelta.setAttribute('class','trip-info');
    tripDelta.id = "trip-delta-"+tripNumber
    tripDelta.innerHTML = "In "+data.delta+(data.delta>1?" days":" day")

    const tripWeather  = document.createElement('div');
    tripWeather.setAttribute('class','trip-info');
    tripWeather.id = "trip-weather-"+tripNumber
    tripWeather.innerHTML = "Expected weather is "+data.weather

    tripRight.appendChild(tripDest)
    tripRight.appendChild(tripDate)
    tripRight.appendChild(tripDelta)
    tripRight.appendChild(tripWeather)

    tripContainer.append(currentTrip);   
}

function clearAllTrips(){
    const tripContainer = document.getElementsByClassName("planned-trips-container")[0];
    while (tripContainer.firstChild) {
        tripContainer.removeChild(tripContainer.lastChild);
    }
    return false;
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

document.addEventListener("scroll",makeSectionActive)


export{addNewTrip,clearAllTrips}