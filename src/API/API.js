
import axios from './axiosInstance'

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