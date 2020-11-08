# Project udacity-travel-planner
This website is the last project of Udacity Front End Web developper class https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011

# Purpose
The website is a travel application pulling data from different sources.

The project includes a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. There will be also an image of the location entered. 

# API used in the project

    * Geonames: https://www.geonames.org/export/web-services.html
    
    * Pixabay: https://pixabay.com/api/docs/
    
    * Weatherbit : https://www.weatherbit.io/api
       - Climate Normals API: https://www.weatherbit.io/api/climate-normals
       - Weather forecast API: https://api.weatherbit.io/v2.0/forecast/daily 
       

# Set up your environment
 
    - run npm install in the folder
    
    - create a .env file at the root of this project, and fill it with the following environment variables (KEY = keyValue)
            * PIXABAY_KEY 
            * WEATHERBIT_KEY
            * GEONAMES_KEY
            
    - the following scripts are available    
        * "dev": build the development environement and open the browser
        * "build": build the production environement
        * "start": run the server in production mode on port 8089
        * "build-and-start": combine both scipts above  
        * "test": run the test suite
