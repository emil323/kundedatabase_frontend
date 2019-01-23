import Axios from "axios"

export default function (){

    const instance =  Axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            'Content-Type': 'application/json',
          }
    })

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('adal.idtoken')
        config.headers.Authorization =  token ? `Bearer ${token}` : ''
        return config
      })

    return instance 
}