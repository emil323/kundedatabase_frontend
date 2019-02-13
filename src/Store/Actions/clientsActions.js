
import api from '../../API/API'
import {FETCH_CLIENTS, ADD_CLIENT, DELETE_CLIENT, SEARCH_KEY, FETCH_ACCESS_LOG, TOGGLE_MODAL, TOGGLE} from '../types'

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

export const fetchAccessLog = (accesslog) => {
    return {
        type: FETCH_ACCESS_LOG,
        accesslog
    }
}

export const fetchAccessLogData = () => {
    return (dispatch) => {
        return api.accesslog().list()
            .then(response => {
                dispatch(fetchAccessLog(response.data))
            })
            .catch(error => {
                throw error
            })
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

export const addClientData = () => {
    console.log(addClient.client)
    return(dispatch) => {
        return api.clients().create()
            .then(response => {
                dispatch(addClient(response.data))
            })
            .catch(error => {
                throw(error)
            })
    }
}
