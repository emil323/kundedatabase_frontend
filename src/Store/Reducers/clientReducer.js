
import {FETCH_CLIENT, METADATA_LOADED, FETCH_METADATA, CLEAR, IS_LOADING} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    client_id : '',
    client_name : '',
    metadata_loaded : false,
    metadata : [],
    is_loading:true
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_CLIENT:
            return {
                ...state,
                client_id: action.client_id,
                client_name: action.name,
                metadata_loaded:false //Set metadata loaded to false, because it indicates that we have changed client, and want to reset metadata
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
        case IS_LOADING:
            return {
                ...state,
                is_loading:action.is_loading
            }
        case CLEAR:
            return initState
        default:
            return state
    }
}

export default clientsReducer