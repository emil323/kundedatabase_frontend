
import api from '../../API/API'
import {FETCH_ACCESS_LOG, ADD_LOG_ITEM, SEARCH_KEY} from '../types'

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

