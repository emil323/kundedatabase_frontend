import axios from './axiosInstance'
//import {API_URL} from './Settings'

export default {
    client: (clientID) => {
        return {
            get() {
                return axios().get("/client/" + clientID)
            },
            files() {
                return axios().get("/client/" + clientID + "/files")
            },
            deleted_files() {
                return axios().get("/client/" + clientID + "/deleted_files")
            },
            delete() {
                return axios().delete("/client/" + clientID + "/delete")
            },
            metadata() {
                 return axios().get("/client/" + clientID + "/metadata")
            },
            update_metadata() {
                return axios().post("/client/" + clientID + "/metadata")
            }
        }
    },
    clients: () => {
        return {
            list() {
                return axios().get("/clients")
            },
            create(data) {
                return axios().post("/clients/create", data)
            }
        }
    },
    users: () => {
        return {
            list() {
                return axios().get("/useraccess")
            },
            create() {
                return axios().get("/useraccess/create")
            }
        }
    },
    accesslog: () => {
        return {
            list(client_id) {
                //Client ID is optional
                const url = client_id === undefined ? '/accesslog' : '/accesslog/' + client_id
                return axios().get(url)
            },
            create(data) {
                return axios().post("/accesslog/create", data)
            }
        }
    },

    favourites: () => {
        return {
            list() {
                return axios().get('/favourites')
            },
            create(client_id) {
                return axios().post("/favourites/create", {client_id})
            },
            delete(client_id) {
                return axios().post("/favourites/delete/", {client_id})
            }
        }
    },

    file: (file_id) => {
        return {
            metadata: () => {
                return axios().get('/file/' + file_id + '/metadata')
            },
            download: () => {
                return axios().get('/file/' + file_id, {responseType: 'blob'})
            },
            move: (new_parent_folder) => {
                return axios().post('/file/' + file_id + '/move', {new_parent_folder})
            },
            rename(new_name) {
                return axios().post('/file/' + file_id + '/rename/', {new_name})
            },
            delete: () => {
                return axios().delete('/file/' + file_id)
            },
            recover: (new_parent_folder) => {
                return axios().post('/file/' + file_id + '/recover', {new_parent_folder})
            }
        }
    },
    folder: (folder_id) => {
        return {
            upload(form_data) {
                return axios().post('/folder/' + folder_id + "/upload", form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            },
            create_folder(new_folder_name) {
                return axios().post('/folder/' + folder_id + '/create_folder', {new_folder_name})
            },
            move(new_parent_folder) {
                return axios().post('/folder/' + folder_id + '/move', {new_parent_folder})
            },
            rename(new_name) {
                return axios().post('/folder/' + folder_id + '/rename', {new_name})
            },
            delete: () => {
                return axios().delete('/folder/' + folder_id)
            },
            recover: (new_parent_folder) => {
                return axios().post('/folder/' + folder_id + '/recover', {new_parent_folder})
            }
        }
    },
    consultants: () => {
        return {
            list(graph_token) {
                return axios().get('/users/' + graph_token)
            }
        }
    },
    metadata: () => {
        return {
            default_values() {
                return axios().get("/metadata/default_values")
            }
        }
    },
    profile: () => {
        return {
            get() {
                return axios().get("/profile/")
            },
            favourites() {
                return axios().get("/profile/favourites")
            }
        }
    }
}

