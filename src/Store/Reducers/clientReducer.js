
import {FETCH_CLIENT} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    client_id : '',
    client_name : ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_CLIENT:
            return {  
                client_id: action.client_id,
                client_name: action.name
            }
        default:
            return state
    }
}

export default clientsReducer