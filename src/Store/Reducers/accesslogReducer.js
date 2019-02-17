
import {FETCH_ACCESS_LOG, ADD_LOG_ITEM, SEARCH_KEY} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    accesslog: [],
    searchLog: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const accesslogReducer = (state = initState, action) => {
    switch(action.type){
        case ADD_LOG_ITEM:
            return {
                ...state,
                logItem: [...state.accesslog, action.logItem.logItem]
            }
        case FETCH_ACCESS_LOG:
            return { ...state,
                accesslog: action.accesslog.accesslog
            }
        case SEARCH_KEY:
            return {
                ...state,
                searchLog: action.search_key    
            }
        default:
            return state
    }
}

export default accesslogReducer