
import api from '../../API/API'
import {FETCH_FILES, ADD_FILE, DELETE_FILE, SEARCH_KEY} from '../types'

export const deleteFile = (id) => {
    return {
        type: DELETE_FILE,
        id: id
    }
}

export const addFile = (file) => {
    return {
        type: ADD_FILE,
        file: file
    }
}

export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const fetchFiles = (files, root_folder, selected_folder, client_id) => {
    return {
        type: FETCH_FILES,
        files, root_folder,selected_folder,client_id
    }
}

export const fetchFilesData = (client_id, selected) => {
    
    return (dispatch) => {
        return api.client(client_id).files()
            .then(response => {

                const files = response.data
                const root_folder = files.find((file) => {return file.is_root}).id
                const selected_folder = files.find((file) => {return file.id === selected && file.is_directory}) != null ? selected : root_folder

                dispatch(fetchFiles(files,root_folder,selected_folder,client_id))
            })
            .catch(error => {
                throw(error)
            })
    }
}
