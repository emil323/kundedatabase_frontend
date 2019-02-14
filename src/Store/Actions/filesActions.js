
import api from '../../API/API'
import {FETCH_FILES, SEARCH_KEY, TOGGLE_UPLOAD_MODAL, TOGGLE_NEW_FOLDER_MODAL, TOGGLE_MOVE_MODAL, TOGGLE_RENAME_MODAL} from '../types'


export const toggleUploadModal = () => {
    return {
        type: TOGGLE_UPLOAD_MODAL
    }
}

export const toggleMoveModal = (file) => {
    return {
        type: TOGGLE_MOVE_MODAL,
        file
    }
}

export const toggleRenameModal = (file) => {
    return {
        type: TOGGLE_RENAME_MODAL,
        file
    }
}

export const toggleNewFolderModal = () => {
    return {
        type: TOGGLE_NEW_FOLDER_MODAL
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
    
    /**
     * Recursive function to generate full path for each file and folde
     * @param {*} files  
     * @param {*} file 
     * @param {*} path 
     */
    function generateRelations (files, file,relations) {
        if(relations == null)
            relations = [file]      
        if(file.is_root) 
            return relations    
        const parent = files.find(f => {return f.id === file.parent_id})

        relations.push(parent)
        return generateRelations(files, parent, relations)
    }

    return (dispatch) => {
        return api.client(client_id).files()
            .then(response => {

                const files = response.data

                //Run recursive function
                files.forEach(file => {
                    file.relations = generateRelations(files, file)
                })

                const root_folder = files.find((file) => {return file.is_root})

                //Determine what folder to set as selected
                let selected_folder = files.find((file) => {return file.id === selected && file.is_directory}) 
                selected_folder = selected_folder != null ? selected_folder : root_folder
                //Dispatch to fetch_files
                dispatch(fetchFiles(files,root_folder,selected_folder,client_id))
            })
            .catch(error => {
                throw(error)
            })
    }
}
