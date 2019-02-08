
import {ADD_FILE, DELETE_FILE, SEARCH_KEY, FETCH_FILES} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    files: [],
    root_folder: {id:'', name:''},
    selected_folder: {id:'', name:''},
    client_id:'',
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const filesReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_FILES:
            console.log(action)
            return { 
                files:action.files,
                root_folder:action.root_folder,
                selected_folder:action.selected_folder,
                client_id:action.client_id,
                search:''
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