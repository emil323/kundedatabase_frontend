
import api from '../../API/API'
import {FETCH_ACCESS_LOG, ADD_LOG_ITEM, SEARCH_KEY, IS_LOADING} from '../types'

export const addLogItem = (logItem) => {
    return {
        type: ADD_LOG_ITEM,
        item: logItem
    }
}

export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const fetchAccessLog = (accesslog) => {
    return {
        type: FETCH_ACCESS_LOG,
        accesslog
    }
}

export const setIsLoading = (is_loading) => {
    return {
        type: IS_LOADING,
        is_loading
    }
}

export const fetchAccessLogData = (type,id) => {
    console.log('fetchaccess', type,id)
    return (dispatch) => {
        dispatch(setIsLoading(true))
        return api.accesslog().filter(type).id(id)
            .then(response => {
                dispatch(setIsLoading(false))
                dispatch(fetchAccessLog(response.data))
            })
            .catch(error => {
                throw error
            })
    }
}

