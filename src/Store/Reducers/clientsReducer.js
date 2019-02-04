
import {ADD_CLIENT, DELETE_CLIENT, SEARCH_KEY, FETCH_CLIENTS} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    clients: [],
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_CLIENTS:
            return { ...state, 
                clients: action.clients.clients,
            }
        case SEARCH_KEY:
            return {
                ... state,
                search: action.search_key    
            }
        case ADD_CLIENT:
        let clients = [...state.clients, action.client];
        return {
                ...state,
                clients: clients
        };
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