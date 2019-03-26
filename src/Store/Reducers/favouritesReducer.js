
import {SEARCH_KEY, FETCH_FAVOURITES, IS_LOADING} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    favourites: [],
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const favouritesReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_FAVOURITES:
            return { ...state, 
                search:'',
                favourites: action.favourites.favourites
            }
        case IS_LOADING:
            return {
                ...state,
                is_loading:action.is_loading
            }    
        default:
            return state
    }
}

export default favouritesReducer