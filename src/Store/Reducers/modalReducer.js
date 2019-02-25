
import {UPLOAD_MODAL, NEW_FOLDER_MODAL, MOVE_MODAL, RENAME_MODAL, EDITOR_MODAL, DELETE_MODAL} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    new_folder_modal: false, 
    upload_modal: false,
    editor_modal:false,
    delete: {
        modal:false,
        file:{id:'',name:''}
    },
    move: {
        modal:false,
        file:{id:'',name:''}
    },
    rename: {
        modal:false,
        file: {id:'',name:''}
    }
}



// Reducers are called when a change happens. The reducers changes the initial state
const modalReducer = (state = initState, action) => {
    switch(action.type){
        case UPLOAD_MODAL:
            return {
                ...state,
                upload_modal: !state.upload_modal
            }
        case MOVE_MODAL:
            console.log(action)
            return {
                ...state,
                move: {
                    file: action.file ? action.file : state.move.file,
                    modal: !state.move.modal
                }
            }
        case DELETE_MODAL:
            return {
                ...state,
                delete: {
                    file: action.file ? action.file : state.delete.file,
                    modal: !state.delete.modal
                }
            }    
        case RENAME_MODAL: 
            return {
                ...state,
                rename: {
                    file: action.file ? action.file : state.rename.file,
                    modal: !state.rename.modal
                }        
            }        
        case NEW_FOLDER_MODAL: {
            return {
                ...state,
                new_folder_modal: !state.new_folder_modal
            }    
        }   
        case EDITOR_MODAL:
            return {
                ...state,
                editor_modal: !state.editor_modal
            }
        default:
            return state
    }
}

export default modalReducer