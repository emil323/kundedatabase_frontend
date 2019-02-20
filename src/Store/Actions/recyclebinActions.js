import {FETCH_DELETED_FILES} from '../types'

export const fetchRecyclebin= (files, root_folder, selected_folder, client_id) => {
    return {
        type: FETCH_DELETED_FILES,
        files, root_folder,selected_folder,client_id
    }
}