
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

export const fetchFiles = (files) => {
    return {
        type: FETCH_FILES,
        files
    }
}

export const fetchFilesData = () => {
    return (dispatch) => {
        return api.files().list()
            .then(response => {
                dispatch(fetchFiles(response.data))
            })
            .catch(error => {
                throw(error)
            })
    }
}
