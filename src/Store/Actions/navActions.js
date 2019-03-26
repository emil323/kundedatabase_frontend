import { UPDATE_NAV } from "../types";


export const setNav = (options) => {
    return {
        type: UPDATE_NAV,
        options
    }
}