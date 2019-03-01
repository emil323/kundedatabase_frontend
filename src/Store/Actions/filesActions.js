
import api from '../../API/API'
import {FETCH_FILES, SEARCH_KEY,SELECT_FOLDER, CLEAR} from '../types'


export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const selectFolder = (folder_id) => {
    return {
        type: SELECT_FOLDER,
        folder_id
    }
}

export const clearFiles = () => {
    return {
        type: CLEAR
    }
}

export const fetchFiles = (newState) => {
    return {
        type: FETCH_FILES,
        newState
    }
}




export const fetchFilesData = (client_id, selected, is_recyclebin) => {
    
    /**
     * Recursive function to generate full path for each file and folde
     * @param {*} files  
     * @param {*} file 
     * @param {*} path 
     */


    return (dispatch) => {
        return api.client(client_id).files().then(response => {
            //Create files array and deleted files array
            const files = response.data.filter(file => !file.is_deleted)
            const deleted_files = response.data.filter(file => file.is_deleted)

            //Run recursive function for files
            files.forEach(file => {
                file.relations = generateRelations(files, file)
                file.fullpath = [...file.relations].reverse().map(r => `${r.name}`).join('/') //Generate full path
            })

            //Run recursive path making for deleted files
            deleted_files.forEach(deleted => {
                deleted.relations = generateRelations(deleted_files, deleted)
            })

            //Find root folder and root for deleted files
            const root_folder = files.find(file => file.is_root)
            const recyclebin_root = deleted_files.find(file => file.is_root)

            //Determine what folder to set as selected, based on selected_folder input and recycle_bin is true or false
            let selected_folder

            if(is_recyclebin) {
                //Selected folder is in recyclebin
                selected_folder = deleted_files.find((file) => {return file.id === selected && file.is_directory}) 
                selected_folder = selected_folder != null ? selected_folder : recyclebin_root
            } else {
                //Selected folder is not in recyclebin
                selected_folder = files.find((file) => {return file.id === selected && file.is_directory}) 
                selected_folder = selected_folder != null ? selected_folder : root_folder
            }

            const newState = {
                files,
                deleted_files,
                root_folder,
                recyclebin_root, 
                selected_folder,
                client_id,
                is_recyclebin,
                search: ''
            }
            
            //Dispatch to fetch_files
            dispatch(fetchFiles(newState))
        })
        .catch(error => {
            throw(error)
        })

        /**
         * Function to generate an array of a file/folders relations
         * This is useful for genereting full path for a file
         * @param {*} files 
         * @param {*} file 
         * @param {*} relations 
         */

        function generateRelations (files, file,relations) {
            if(relations == null)
                relations = [file]      
            if(file.is_root) 
                return relations    
            const parent = files.find(f => {return f.id === file.parent_id})
            if(parent == null) return relations //This should normally not happen, and indicates problem with folder-hiarchy
            relations.push(parent)
            return generateRelations(files, parent, relations)
        }
    }
}
