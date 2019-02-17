
import axios from './axiosInstance'
import {API_URL} from './Settings'

export default  {
    client: (clientID) => {
        return {
            get() {
                return axios().get("/client/" + clientID)
            },
            files() {
                return axios().get("/client/" + clientID + "/files")
            },
            delete() {
                return axios().delete("/client/" + clientID + "/delete")
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
            list() {
                return axios().get("/accesslog")    // Må være noe feil her?
            }
        }
    },
   
    file: (file_id) => {
        return {
            move: (folder_id) => {
                return axios().post('/files/' + file_id + '/move/' + folder_id)
            },
            rename(new_name) {
                return axios().post('/files/' + file_id + '/rename/', {new_name})
            },
            download: () => {
                return axios().get('/files/' + file_id + "/download", {responseType: 'blob'})
            }
        }
    },
    folder: (folder_id) => {
        return {
            upload(form_data) {
                return axios().post('/files/folder/' + folder_id + "/upload", form_data, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
            },
            create_folder(new_folder_name) {
                return axios().post('/files/folder/' + folder_id + '/create_folder', {new_folder_name})
            },
            move(new_parent_folder) {
                return axios().post('/files/folder/' + folder_id + '/move/' + new_parent_folder)
            },
            rename(new_name) {
                return axios().post('/files/folder/' + folder_id + '/rename/', {new_name})
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

