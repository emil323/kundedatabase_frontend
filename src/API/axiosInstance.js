import Axios from "axios"
import { loadProgressBar } from 'axios-progress-bar'
import {API_URL} from '../Settings'
import { authContext } from "./Auth/adalConfig";



export default function (){

    /**
     * Create a Axios instance that will be used in api.js
     */

    const instance =  Axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
          }
    })

    /**
     * This interceptor adds authentication token to Authorization header
     */
    
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('adal.idtoken')
        config.headers.Authorization =  token ? `Bearer ${token}` : ''
        return config
      })

      /**
       * Error handling for authentication or authorization issues
       */

    instance.interceptors.response.use(function (res) {
        console.log(res)
        return res;
      }, function (error) {
        const statusCode = error.response.status 
        switch(statusCode) {
          //JWT Token expired
          case 401:
            alert('nektet adgang.')
            console.log('access denied')
            authContext.logOut()
            break;
          case 499:
            console.log('Logging in because of expired token.')
            authContext.login()
          break;
          case 403:
            alert('Du har ikke adgang til dette området.')
            authContext.logOut()
          break;
        }
        console.log(error.response)
        return Promise.reject(error);
      });

    //Add fancy progressbar
    loadProgressBar(null, instance)

    return instance 
}


