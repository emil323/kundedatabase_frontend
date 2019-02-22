
import api from '../../API/API'
import {fetchRecyclebin} from './recyclebinActions'
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

export const fetchFiles = (files, root_folder, selected_folder, client_id) => {
    return {
        type: FETCH_FILES,
        files, root_folder,selected_folder,client_id
    }
}




export const fetchFilesData = (client_id, selected, recyclebin) => {
    
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
        if(parent == null) return relations //This should normally not happen, and indicates problem with folder-hiarchy
        relations.push(parent)
        return generateRelations(files, parent, relations)
    }

    const request = (res) => {
        return recyclebin 
            ? api.client(client_id).deleted_files().then(res)
            : api.client(client_id).files().then(res)
      }
    return (dispatch) => {
        return request(response => {
            console.log(response)
            const files = response.data
            
            //Run recursive function
            files.forEach(file => {
                file.relations = generateRelations(files, file)
            })

            const root_folder = files.find(file => file.is_root)

            //Determine what folder to set as selected
            let selected_folder = files.find((file) => {return file.id === selected && file.is_directory}) 
            selected_folder = selected_folder != null ? selected_folder : root_folder
            //Dispatch to fetch_files
            recyclebin 
            ? dispatch(fetchRecyclebin(files,root_folder,selected_folder,client_id))
            : dispatch(fetchFiles(files,root_folder,selected_folder,client_id))
        })
        .catch(error => {
            throw(error)
        })
    }
}
