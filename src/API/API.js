
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
    files: () => {
        return {
            folder: (folderID) => {
                return{
                    upload(formData) {
                        return axios().post('/files/folder/' + folderID + "/upload", formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                        })
                    },
                    create_folder(data) {
                        return axios().post('/files/folder/' + folderID + '/create_folder', data)
                    },
                    move(parent_folder) {
                        return axios().post('/files/folder/' + folderID + '/move/' + parent_folder)
                    }
                }
            },
            download: (file_id) => {
                return axios().get('/files/' + file_id + "/download", {responseType: 'blob'})
            }
        }
    },
    file: (file_id) => {
        return {
            move: (folder_id) => {
                return axios().post('/files/' + file_id + '/move/' + folder_id)
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

