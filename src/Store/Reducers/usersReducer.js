
import {ADD_USER, SEARCH_KEY, FETCH_USERS} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    users: [],
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const usersReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_USERS:
            return { ...state, 
                clients: action.clients.clients
            }
        case SEARCH_KEY:
            return {
                ...state,
                search: action.search_key    
            }
        case ADD_USER:
        let clients = [...state.clients, action.client];
        return {
                ...state,
                clients: clients
        };
        default:
            return state
    }
}

export default usersReducer