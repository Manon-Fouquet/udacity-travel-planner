function getGeoNamesURL(city,apiKey){
    const url ="http://api.geonames.org/searchJSON?q="+city+"&maxRows=1&username="+apiKey
    return  url
}


function getPixaBayURL(cityName,apiKey){
    const url ="https://pixabay.com/api/?key="+apiKey+'&q='+cityName+"&image_type=photo&category=places&min_width=100px&min_height=100px&pretty=true"
    return  url
}


module.exports = {getGeoNamesURL,getPixaBayURL}
