function getGeoNamesURL(city,apiKey){
    const url ="http://api.geonames.org/searchJSON?q="+city+"&maxRows=1&username="+apiKey
    return  url
}

function getGeoNamesCoordinates(data){
    const coordinates = {}
    coordinates.lat = data.geonames[0].lat;
    coordinates.long = data.geonames[0].lng;
    return coordinates
}

function getPixaBayURL(cityName,apiKey){
    const url ="https://pixabay.com/api/?key="+apiKey+'&q='+cityName+"&image_type=photo&category=places&min_width=100px&min_height=100px&pretty=true"
    return  url
}

function getPictureURL(pixaBayData){
    return pixaBayData.hits.length>0? pixaBayData.hits[0].webformatURL:""
}
// day of type string
function getWeatherbitDays(dayString){
    const day = new Date(dayString)
    //https://www.w3schools.com/js/js_date_methods.asp
    const days = {}
    days.today =pad(day.getMonth()+1) +'-'+ pad(day.getDate())

    const tomorrow = addDays(day, 1) 
    days.tomorrow =pad(tomorrow.getMonth()+1) +'-'+ pad(tomorrow.getDate())
    return days
}

function pad(myNumber){
    return myNumber.toString().padStart(2, "0")
}

function getHistoricalWeatherBitURL(lat,long,dateString,apiKey){
    const days = getWeatherbitDays(dateString)
    const url ="https://api.weatherbit.io/v2.0/normals?&key="+apiKey+"&lat="+lat+"&lon="+long+"&start_day="+days.today+"&end_day="+days.tomorrow+"&tp=daily"
    return  url
}

// from https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

module.exports = {getGeoNamesURL,getGeoNamesCoordinates,getPixaBayURL,getHistoricalWeatherBitURL,getWeatherbitDays,getPictureURL}
