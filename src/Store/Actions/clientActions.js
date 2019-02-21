import api from '../../API/API'
import {FETCH_CLIENT } from '../types'

export const fetchClient = (client_id,name) => {
    return {
        type: FETCH_CLIENT,
        client_id,name
    }
}


export const fetchClientData = (client_id) => {
    return (dispatch) => {
        return api.client(client_id).get().then((response) => {
            const {name} = response.data
            
            dispatch(fetchClient(client_id, name))
        })
        .catch(error => {
            throw(error)
        })
    }
}