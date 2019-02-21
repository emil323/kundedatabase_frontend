import {SET_TRAIL, PUSH_TRAIL } from '../types'

export const setTrail = (trail) => {
    return {
        type: SET_TRAIL,
        trail
    }
}

export const pushTrail = (title, path) => {
    return {
        type: PUSH_TRAIL,
        title,path
    }
}
