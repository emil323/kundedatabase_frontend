import axios from './axiosInstance'

export default {
    get: ({id}) => axios().get("/client/${id}"),
    getAll: () => axios().get("/clients")
}