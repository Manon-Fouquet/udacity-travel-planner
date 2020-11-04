import './styles/main.scss'
import './styles/new-trip.scss'
import './styles/old-trip.scss'

import {clearAllTrips,addNewTrip} from './js/travelCreator'
import { handleSubmit} from './js/formHandler'

clearAllTrips()

//For debug purposes: replaces the two inputs in the HTML with 3 created ones
/*
for(let i=0;i<=1;i++){
    console.log("Adding new trip #"+i)
    addNewTrip(i,null);
}
*/

export{handleSubmit}
