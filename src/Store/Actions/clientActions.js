export const deleteClient = (id) => {
    return {
        type: 'DELETE_CLIENT',
        id: id
    }
}

export const addClient = (client) => {
    return {
        type: 'ADD_CLIENT',
        client: client
    }
}