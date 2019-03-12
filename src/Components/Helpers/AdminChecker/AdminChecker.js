
import { authContext,hasRoles } from '../../../API/Auth/adalConfig';
import {ADMIN_ROLE} from '../../../Settings'

/**
 * Returns true if Admin
 */

export const isAdmin = hasRoles(authContext)
                        ? authContext.getCachedUser().profile.roles.includes(ADMIN_ROLE) //Check if admin role is defined
                        : false 

/**
 * Functional component that works as a wrapper, renders props.children if is admin
 * @param {} props 
 */

export function AdminUser(props) {
    return isAdmin ? props.children : null
}

/**
 * Functional component that works as a wrapper, renders props.children if is NOT admin
 * @param {} props 
 */

export function RegularUser(props) {
    return isAdmin ? null : props.children
}