import { UPDATE_NAV, SEARCH_KEY } from "../types";


export const setNav = (options) => {
    return {
        type: UPDATE_NAV,
        options
    }
}

export const updateSearch = (e) => {
    const key = e.target.value
    return {
        type: SEARCH_KEY,
        key
    }
}