import Axios from "axios"
import { loadProgressBar } from 'axios-progress-bar'
import {API_URL} from '../Settings'



export default function (){

    const instance =  Axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
          }
    })
    
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('adal.idtoken')
        config.headers.Authorization =  token ? `Bearer ${token}` : ''
        return config
      })

    loadProgressBar(null, instance)

    return instance 
}


