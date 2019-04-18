
import api from '../../API/API'
import {FETCH_FILES, SEARCH_KEY, SELECT_FOLDER, CLEAR, IS_LOADING, SELECT_FILE} from '../types'
import { clearClient, fetchClientData } from './clientActions'


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

export const selectFile = (file_id) => {
    return {
        type: SELECT_FILE,
        file_id
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

export const setIsLoading = (is_loading) => {
    return {
        type: IS_LOADING,
        is_loading
    }
}

export const fetchFilesDataByFileID = (file_id) => {
    return dispatch => {
        dispatch(setIsLoading(true)) //Toggle is loading
        /*Make API request for file metadata*/
        api.file(file_id).metadata().then(response => {
            const {folder_id, client_id} = response.data
            dispatch(fetchFilesData(client_id, folder_id, {selected_file:file_id}))
        })
    }
}

export const fetchFilesData = (client_id, selected, options) => {
    
    /**
     * Recursive function to generate full path for each file and folde
     * @param {*} files  
     * @param {*} file 
     * @param {*} path 
     */
    //Default options
    if(options === undefined) {
        options = {
            is_recyclebin:false,
            selected_file:null
        }
    }

    return (dispatch) => {
        /* Dispatch to clear client and fetch client data */
        dispatch(setIsLoading(true)) //Toggle is loading
        dispatch(clearClient)
        dispatch(fetchClientData(client_id))

        //Load from API
        return api.client(client_id).files().then(response => {
            //Create files array and deleted files array
            const files = response.data.filter(file => !file.is_deleted)
            const deleted_files = response.data.filter(file => file.is_deleted)

            //Run recursive function for files
            files.forEach(file => {
                file.relations = generateRelations(files, file)
                file.fullpath = generateFullPath(file.relations)
            })

            //Run recursive path making for deleted files
            deleted_files.forEach(deleted => {
                deleted.relations = generateRelations(deleted_files, deleted)
                deleted.fullpath = generateFullPath(deleted.relations)
            })

            //Find root folder and root for deleted files
            const root_folder = files.find(file => file.is_root)
            const recyclebin_root = deleted_files.find(file => file.is_root)

            //Determine what folder to set as selected, based on selected_folder input and recycle_bin is true or false
            let selected_folder

            //Determine selected_folder
            if(options.is_recyclebin) {
                //Selected folder is in recyclebin
                selected_folder = deleted_files.find((file) => {return file.id === selected && file.is_directory}) 
                selected_folder = selected_folder != null ? selected_folder : recyclebin_root
            } else {
                //Selected folder is not in recyclebin
                selected_folder = files.find((file) => {return file.id === selected && file.is_directory}) 
                selected_folder = selected_folder != null ? selected_folder : root_folder
            }

            let selected_file

            //Find selected file
            if(options.selected_file) {
                    selected_file = files.find(f => {return f.id === options.selected_file})
            }
            console.log('options', options)

            const newState = {
                files,
                deleted_files,
                root_folder,
                recyclebin_root, 
                selected_folder,
                selected_file,
                client_id,
                is_recyclebin: options.is_recyclebin,
                search: ''
            }
            console.log('newState', newState)

            //Dispatch to fetch_files
            dispatch(fetchFiles(newState))
            dispatch(setIsLoading(false)) //Toggle is loading to false
        })
        .catch(error => {
            throw(error)
        })

        /**
         * Generate full file path based on generated relations
         * @param {} relations 
         */

        function generateFullPath(relations) {
            let path = [...relations].reverse().map(r => `${r.name}`).join('/')
            if(path.startsWith('//')) path = path.substr(1) //Remove first backslash
            return path
        }

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
            if(parent == null) throw('Folder hiarchy broken.') //This should normally not happen, and indicates problem with folder-hiarchy
            relations.push(parent)
            return generateRelations(files, parent, relations)
        }
    }
}
