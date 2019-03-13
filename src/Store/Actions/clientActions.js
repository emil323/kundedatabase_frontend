import api from '../../API/API'
import {CLEAR, FETCH_CLIENT, FETCH_METADATA, METADATA_LOADED} from '../types'

export const clearClient = () => {
    return {
        type: CLEAR,
    }
}

export const fetchClient = (client_id, name) => {
    return {
        type: FETCH_CLIENT,
        client_id, name
    }
}

export const fetchMetadata = (metadata) => {
    return {
        type: FETCH_METADATA,
        metadata
    }
}

export const setHasLoadedMetadata = (metadata_loaded) => {
    return {
        type: METADATA_LOADED,
        metadata_loaded
    }
}

export const requestMetadata = (client_id) => {
    return (dispatch) => {
        dispatch(setHasLoadedMetadata(false))
        return api.client(client_id).metadata().then((response) => {
            //TODO:Error handeling
            dispatch(setHasLoadedMetadata(true))
            dispatch(fetchMetadata(response.data))
        }).catch(error => {
                throw(error)
            })
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