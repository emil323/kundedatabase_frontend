
import {SEARCH_KEY, FETCH_FILES, TOGGLE_UPLOAD_MODAL, TOGGLE_NEW_FOLDER_MODAL, TOGGLE_MOVE_MODAL} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    files: [],
    root_folder: {id:'', name:''},
    selected_folder: {id:'', name:''},
    client_id:'',
    search: '',
    new_folder_modal: false, 
    upload_modal: false,
    move_folder: {
        modal:false,
        file:{id:'',name:''}
    }
}





// Reducers are called when a change happens. The reducers changes the initial state
const filesReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_FILES:
            console.log(action)
            return { 
                ...state,
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
        case TOGGLE_UPLOAD_MODAL:
            return {
                ...state,
                upload_modal: !state.upload_modal
            }
        case TOGGLE_MOVE_MODAL:
            console.log(action)
            return {
                ...state,
                move_folder: {
                    file: action.file ? action.file : state.move_folder.file,
                    modal: !state.move_folder.modal
                }
            }    
        case TOGGLE_NEW_FOLDER_MODAL: {
            return {
                ...state,
                new_folder_modal: !state.new_folder_modal
            }    
        }   
        default:
            return state
    }
}

export default filesReducer