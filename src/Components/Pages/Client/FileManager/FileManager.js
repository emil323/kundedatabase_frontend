import React from 'react'
import { Component } from 'react'
import TrailUpdater from './TrailUpdater'
import FileData from './FileData'

import "./FileManager.css"
import { Container, Row, Col, Spinner, Table, Alert, } from 'reactstrap';
import { withRouter } from "react-router-dom"


// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { fetchFilesData, selectFolder, updateSearch, clearFiles } from '../../../../Store/Actions/filesActions'
import { toggleNewFolderModal, toggleUploadModal, toggleEditorModal } from '../../../../Store/Actions/modalActions'
import UploadModal from './Modals/UploadModal/UploadModal';
import NewFolderModal from './Modals/NewFolderModal/NewFolderModal';
import MoveModal from './Modals/MoveModal/MoveModal';
import RenameModal from './Modals/RenameModal/RenameModal';
import EditorModal from './Modals/EditorModal/EditorModal'
import DeleteModal from './Modals/DeleteModal/DeleteModal';
import RecoverModal from './Modals/RecoverModal/RecoverModal';
import FileNav from "./FileNav";

class FileManager extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        /**
         *  Define a filter of files visible, used to handle searching.
         * */
        const filteredFiles = this.props.is_searching
            ? this.props.all_files.filter(file => { //Search in all files in this client
                //searching logic
                return file.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
            })
            : this.props.files //Nothing to seach, view all files

        /**
         * Render filemanager
         * */
        return (
            <Container fluid>
                <FileNav {...this.props} />
                <Row>

                

                        <Table className="table table-hover">
                            {
                                //Display is searching message
                                this.props.is_searching ?
                                    <tr>
                                        <td colspan="4">
                                            <Alert color="dark">
                                                <h4>
                                                    Søkeresultat: {this.props.search}
                                                </h4>
                                            </Alert>
                                        </td>
                                    </tr>
                                    : ''
                            }
                            {/*Display is empty message*/}
                            {!this.props.is_searching && !this.props.is_loading && filteredFiles.length === 0 ?
                                <tr>
                                    <td colspan="4">
                                        <Alert color="light">
                                            <p className="text-center">
                                                Her er det tomt.
                                            </p>
                                        </Alert>
                                    </td>
                                </tr>
                                //Display is loading message
                                : this.props.is_loading ?
                                    <tr>
                                        <td colspan="4">
                                            <Alert color="light">
                                                <p className="text-center">
                                                    <Spinner color="dark" />
                                                </p>
                                            </Alert>
                                        </td>
                                    </tr>
                                    //Show all files
                                    : filteredFiles.map(file => {
                                        return <FileData file={file} key={file.id} />
                                    })
                            }
                        </Table>
                </Row>


                {/*Not visible unless toggled*/}
                <NewFolderModal />
                <UploadModal />
                <MoveModal />
                <RenameModal />
                <EditorModal />
                <DeleteModal />
                <RecoverModal />

                {/* Returns null, is only used to update breadcrumbs*/}
                <TrailUpdater />
            </Container>

        )
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {

        //Initial fetch of data
        const folder = this.props.match.params.selected_folder
        this.props.fetchFilesData(this.props.match.params.client_id, folder, {is_recyclebin:this.props.is_recyclebin})
    }

    /**
     *  This is important, it will be called when the URL changes. That means user has clicked a folder, and we need to react to that.
     * @param {*} nextProps
     */

    componentDidUpdate() {
        console.log('updated')
    }

    componentWillReceiveProps(nextProps) {
        console.log('will')
        const old_params = this.props.match.params
        const new_params = nextProps.match.params

        //Get fuckt
        if (old_params.client_id !== new_params.client_id
            || old_params.selected_folder !== new_params.selected_folder) {
            console.log("Change folder: ", new_params.selected_folder)
            //this.props.fetchFilesData(nextProps.match.params.client_id, nextProps.match.params.selected_folder)
            this.props.selectFolder(new_params.selected_folder)
        }
        //Check if mode (url) is toggled to recyclebin
        if (this.props.is_recyclebin !== nextProps.is_recyclebin) {
            //Refetch inventory
            this.props.fetchFilesData(new_params.client_id, new_params.selected_folder, {is_recyclebin:nextProps.is_recyclebin})
        }
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state, ownProps) => {
    const { search } = state.navReducer
    const { files, deleted_files, root_folder, recyclebin_root, selected_folder, is_loading } = state.filesReducer
    const { client_id, client_name } = state.clientReducer

    //Create a variable that selects files that is viewable, based on if prop is set to recyclebin or not
    const viewable_files = ownProps.is_recyclebin ? deleted_files : files

    return {
        client_id,
        client_name,
        //Filter to only display files from selected folder or to handle a search value
        files: viewable_files.filter((file) => {
            return file.parent_id === selected_folder.id
            //TODO:Handle search value
        }),
        all_files: viewable_files, //Define this to be used for seaching
        root_folder,
        recyclebin_root,
        selected_folder,
        search,
        is_searching: search != '',
        is_loading
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilesData: (client_id, selected_folder, is_recyclebin) => {
            dispatch(fetchFilesData(client_id, selected_folder, is_recyclebin))
        },
        selectFolder: (folder_id) => {
            dispatch(selectFolder(folder_id))
        },
        updateSearch: (search_key) => {
            dispatch(updateSearch(search_key))
        },
        toggleNewFolderModal: () => {
            dispatch(toggleNewFolderModal())
        },
        toggleUploadModal: () => {
            dispatch(toggleUploadModal())
        },
        toggleEditorModal: () => {
            dispatch(toggleEditorModal())
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileManager))