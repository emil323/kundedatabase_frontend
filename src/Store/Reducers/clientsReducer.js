
import {DELETE_CLIENT, SEARCH_KEY, FETCH_CLIENTS, FETCH_ACCESS_LOG, SEARCH_LOG_KEY} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    clients: [],
    accesslog: [],
    search: '',
    searchlog: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_CLIENTS:
            return { ...state, 
                clients: action.clients.clients
            }
        case FETCH_ACCESS_LOG:
            return { ...state,
                accesslog: action.accesslog.accesslog
            }
        case SEARCH_KEY:
            return {
                ...state,
                search: action.search_key    
            }
        case DELETE_CLIENT:
            let newClients = state.clients.filter(client => {
                return action.id !== client.id
            });
            return {
                ...state,
                clients: newClients
            };
    
        default:
            return state
    }
}

export default clientsReducer