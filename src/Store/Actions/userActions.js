
import api from '../../API/API'
import {FETCH_USERS, ADD_USER, SEARCH_KEY} from '../types'


export const addClient = (client) => {
    return {
        type: ADD_USER,
        client: client
    }
}

export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const fetchUsers = (clients) => {
    return {
        type: FETCH_USERS,
        clients
    }
}

export const fetchClientsData = () => {
    return (dispatch) => {
        return api.clients().list()
            .then(response => {
                dispatch(fetchClients(response.data))
            })
            .catch(error => {
                throw(error)
            })
    }
}
