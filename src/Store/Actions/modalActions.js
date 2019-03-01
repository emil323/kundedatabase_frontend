import { UPLOAD_MODAL ,NEW_FOLDER_MODAL, MOVE_MODAL, RENAME_MODAL, EDITOR_MODAL, DELETE_MODAL, RECOVER_MODAL} from '../types'

export const toggleEditorModal = () => {
    return {
        type: EDITOR_MODAL
    }
}

export const toggleUploadModal = () => {
    return {
        type: UPLOAD_MODAL
    }
}

export const toggleDeleteModal = (file) => {
    return {
        type: DELETE_MODAL,
        file
    }
}

export const toggleRecoverModal = (file) => {
    return {
        type: RECOVER_MODAL,
        file
    }
}

export const toggleMoveModal = (file) => {
    return {
        type: MOVE_MODAL,
        file
    }
}

export const toggleRenameModal = (file) => {
    return {
        type: RENAME_MODAL,
        file
    }
}

export const toggleNewFolderModal = () => {
    return {
        type: NEW_FOLDER_MODAL
    }
}
