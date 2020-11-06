import './styles/main.scss'
import './styles/new-trip.scss'
import './styles/old-trip.scss'

import {clearAllTrips} from './js/travelCreator'
import { handleSubmit} from './js/formHandler'
import { checkValidDate} from './js/client_utils'

clearAllTrips()

const cityInput = document.getElementById('input-city')
cityInput.addEventListener("focus", (event)=>{
        event.target.placeholder = '';
        event.target.style.color = 'black';
    } 
) 
cityInput.addEventListener("blur", (event)=>{
    if(event.target.value!=""){
        event.target.style.color = 'black';
    }else{        
        event.target.placeholder = 'Enter city name';   
        event.target.style.color = 'darkslategray';
    }
    
}) 


const dateInput = document.getElementById('input-date')
dateInput.addEventListener("focus", (event)=>{
    event.target.style.color = 'black';
} 
) 
dateInput.addEventListener("blur", (event)=>{ 
    if(event.target.value!=""){
        event.target.style.color = 'black';
    }else{
        event.target.style.color = 'darkslategray';
    }
}) 

export{handleSubmit}
