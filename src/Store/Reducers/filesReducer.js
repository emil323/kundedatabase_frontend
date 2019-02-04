
import {ADD_FILE, DELETE_FILE, SEARCH_KEY, FETCH_FILES} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    files: [],
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const filesReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_FILES:
            return { ...state, 
                files: action.files.files,
            }
        case SEARCH_KEY:
            return {
                ...state,
                search: action.search_key    
            }
        case ADD_FILE:
        let files = [...state.files, action.file];
        return {
                ...state,
                files: files
        };
        case DELETE_FILE:
            let newFiles = state.files.filter(file => {
                return action.id !== file.id
            });
            return {
                ...state,
                files: newFiles
            };
    
        default:
            return state
    }
}

export default filesReducer