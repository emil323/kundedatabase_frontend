
import api from '../../API/API'
import {FETCH_CLIENTS, ADD_CLIENT, DELETE_CLIENT, SEARCH_KEY, TOGGLE_MODAL} from '../types'

export const deleteClient = (id) => {
    return {
        type: DELETE_CLIENT,
        id: id
    }
}

export const addClient = (client) => {
    return {
        type: ADD_CLIENT,
        client: client
    }
}

export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    }
}

export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const fetchClients = (clients) => {
    return {
        type: FETCH_CLIENTS,
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

