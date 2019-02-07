
import axios from './axiosInstance'
import UploadFile from '../Components/Pages/UploadFile/UploadFile';

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
            },
            folder: (folderID) => {
                return{
                    upload(formData) {
                        return axios.post('client/' + clientID + "/" +  folderID + "/upload", formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                        })
                    }
                }
            }
        }
    },
    clients: () => {
        return {
            list() {
                return axios().get("/clients")
            }
        }
    },
    files: () => {
        return {
            list() {
                return axios().get("/files")
            }
        }
    },
    document: (documentID) => {
        return {
            get() {
                return axios().get("/document/" + documentID)
            },
            delete() {
                return axios().delete("/document/" + documentID)
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

export function get() {

}