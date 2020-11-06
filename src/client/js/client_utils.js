//const dateRegex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](\d{4})$/ // For MM/DD/YYYY
const dateRegex = /^(\d{4})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/ // For MM/DD/YYYY
const defaultCity = "Nancy";
const defaultDate = "01/01/2021";
const defaultData = {}


// YYYY/MM/DD
function checkValidDate(dateString){
  if(dateString){
    var m = dateString.match(dateRegex);
    console.log(dateString," --> "+m)
    return (m) ? new Date(m[1], m[2]-1, m[3]) : null;
  }
}

function getTimeStamp(dateString){
  const dateIfOk = checkValidDate(dateString)
  return  dateIfOk? dateIfOk.getTime():0
}

// Stub function
function getDefaultData(){
  const defaultCity = "Wonderland";
  const defaultDate = "2021-01-01";   
  const defaultTemp = "20";   
  const defaultDelta = "2";
  const defaultData = {}
  defaultData.city = defaultCity  
  defaultData.date = defaultDate  
  defaultData.delta = defaultDelta   
  defaultData.minTemp = defaultTemp
  defaultData.maxTemp = defaultTemp
  defaultData.img = "/src/client/media/default.jpg"
  return defaultData
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



function sortTrips(timeStamps){
  const timeStampArray = []
  for(let t in timeStamps){
    timeStampArray.push(t);
  }
  timeStampArray.sort((a,b)=>a-b)
  let i=0
  timeStampArray.forEach(ts=>{
    console.log('Setting the order of trip'+timeStamps[ts]+' to '+i)
    document.getElementById('trip'+timeStamps[ts]).style.order=i
    i++;
  }
  )
}


function removeTrip(event){
  const tripId=event.target.getAttribute('data_id');
  console.log("Removing trip "+tripId)
  var element = document.getElementById("trip"+tripId)
  element.parentNode.removeChild(element);
}

export {checkValidDate,getTimeStamp,getDefaultData,removeTrip,sortTrips,getAllTrips,countAllTrips,clearAllTrips}