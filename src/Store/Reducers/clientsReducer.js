
import {DELETE_CLIENT, SEARCH_KEY, FETCH_CLIENTS, ADD_CLIENT, TOGGLE_MODAL, IS_LOADING} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    clients: [],
    accesslog: [],
    modal: false,
    is_loading: false
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    switch(action.type){
        case ADD_CLIENT:
            return {
                ...state,
                clients: [...state.clients, action.client.client]
            }
        case FETCH_CLIENTS:
            return { ...state,
                search:'', 
                clients: action.clients.clients
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                modal: !state.modal
            }
        case IS_LOADING:
            return {
                ...state,
                is_loading: action.is_loading
            }    
        case DELETE_CLIENT:
            let newClients = state.clients.filter(client => {
                return action.id !== client.id
            })
            return {
                ...state,
                clients: newClients
            };
    
        default:
            return state
    }
}

export default clientsReducer