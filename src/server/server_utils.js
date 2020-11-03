
function getGeoNamesURL(north,south,east,west,apiKey){
    const url ="http://api.geonames.org/citiesJSON?north="+north+"&south="+south+"&east="+east+"&west="+west+"&lang=en&username="+apiKey
    return  url
}


//https://pixabay.com/api/?key=18962675-aa369ace4d4e1c5f54816ef9d&q=Paris&image_type=photo&category=places&min_width=100px&min_height=100px
function getPixaBayURL(cityName,apiKey){
    const url ="https://pixabay.com/api/?key="+apiKey+'&q='+cityName+"&image_type=photo&category=places&min_width=100px&min_height=100px&pretty=true"
    return  url
}


module.exports = {getGeoNamesURL,getPixaBayURL}
