
import {FETCH_CLIENT, METADATA_LOADED, FETCH_METADATA} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    client_id : '',
    client_name : '',
    metadata_loaded : false,
    metadata : []
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_CLIENT:
            return {
                ...state,
                client_id: action.client_id,
                client_name: action.name
            }
        case FETCH_METADATA:
            return {
                ...state,
                metadata_loaded:true,
                metadata: action.metadata
            }
        case METADATA_LOADED:
            return {
                ...state,
                metadata_loaded: action.metadata_loaded
            }
        default:
            return state
    }
}

export default clientsReducer