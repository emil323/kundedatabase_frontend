
import api from '../../API/API'
import {FETCH_USERS, ADD_USER, SEARCH_KEY} from '../types'


export const addUser = (user) => {
    return {
        type: ADD_USER,
        user: user
    }
}

export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const fetchUsers = (users) => {
    return {
        type: FETCH_USERS,
        users
    }
}

export const fetchUsersData = () => {
    return (dispatch) => {
        return api.consultants().list()
            .then(response => {
                dispatch(fetchUsers(response.data))
            })
            .catch(error => {
                throw(error)
            })
    }
}
