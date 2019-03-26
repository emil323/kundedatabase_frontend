
import {SEARCH_KEY, FETCH_DELETED_FILES,SELECT_FOLDER} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    files: [],
    recycle_bin : {
        deleted_files: [] 
    },
    root_folder: {id:'', name:''},
    selected_folder: {id:'', name:''},
    client_id:'',
    search: ''
}





// Reducers are called when a change happens. The reducers changes the initial state
const recyclebinReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_DELETED_FILES:
            console.log(action)
            return { 
                ...state,
                files:action.files,
                root_folder:action.root_folder ? action.root_folder : state.root_folder,
                selected_folder:action.selected_folder,
                client_id:action.client_id,
                search:''
            }
        case SELECT_FOLDER:
            const new_selected_folder = state.files.find(f=> f.id === action.folder_id ) //Find folder object based on folder_id
            return {
                ...state, 
                selected_folder : new_selected_folder //Do this, and if folder does not exist, go to root...
                    ? new_selected_folder
                    : state.root_folder
            }    
        default:
            return state
    }
}

export default recyclebinReducer