//const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
const dateRegex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](\d{4})$/
const defaultCity = "Nancy";
const defaultDate = "01/01/2021";
const defaultData = {}


function checkValidDate(dateString){
  if(dateString){
    var m = dateString.match(dateRegex);
    console.log(m)
    return (m) ? new Date(m[3], m[1]-1, m[2]) : null;
  }
}

function getTimeStamp(dateString){
  const dateIfOk = checkValidDate(dateString)
  return  dateIfOk? dateIfOk.getTime():0
}

// Stub function
function getDefaultData(){
  const defaultCity = "Wonderland";
  const defaultDate = "01/01/2021";   
  const defaultTemp = "20";   
  const defaultDelta = "2";
  const defaultData = {}
  defaultData.city = defaultCity  
  defaultData.date = defaultDate  
  defaultData.delta = defaultDelta   
  defaultData.weather = defaultTemp
  defaultData.img = "/src/client/media/default.jpg"
  return defaultData
}


export { checkValidDate,getTimeStamp,getDefaultData}