
import {SEARCH_KEY, FETCH_FILES, SELECT_FOLDER, CLEAR, IS_LOADING, SELECT_FILE} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    files: [],
    deleted_files: [],
    root_folder: {id:'', name:''},
    recyclebin_root: {id:'', name:''},
    selected_folder: {id:'', name:''},
    selected_file:null,
    client_id:'',
    is_recyclebin: false,
    search: '',
    is_loading: true
}





// Reducers are called when a change happens. The reducers changes the initial state
const filesReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_FILES:
            return action.newState
        case SELECT_FILE:
            return {
                ...state,
                selected_file: state.files.find(f => f.id === action.file_id)
            }
        case SELECT_FOLDER:
            const new_selected_folder = state.is_recyclebin //Find reference based on if deleted or not
                    ? state.deleted_files.find(f=>  f.id === action.folder_id ) 
                    : state.files.find(f=>  f.id === action.folder_id ) //Find folder object based on folder_id
            return {
                ...state, 
                selected_folder : new_selected_folder //Do this, and if folder does not exist, go to root...
                    ? new_selected_folder
                    : state.is_recyclebin 
                        ? state.recyclebin_root //Default to correct root folder
                        : state.root_folder
            }    
        case IS_LOADING: 
            return {
                ...state, 
                is_loading: action.is_loading
            }
        case CLEAR:
            return initState
        default:
            return state
    }
}

export default filesReducer