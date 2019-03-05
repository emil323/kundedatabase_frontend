import React from 'react'
import { Component } from 'react'
import TrailUpdater from './TrailUpdater'
import FileData from './FileData'
import PageNav from '../../PageNav/PageNav'

import "./Files.css"
import { withResizeDetector } from 'react-resize-detector';

import { Spinner, Table, Alert } from 'reactstrap';
import { withRouter } from "react-router-dom"


// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { fetchFilesData, selectFolder, updateSearch, clearFiles } from '../../../Store/Actions/filesActions'
import { toggleNewFolderModal, toggleUploadModal, toggleEditorModal } from '../../../Store/Actions/modalActions'
import UploadModal from './UploadModal/UploadModal';
import NewFolderModal from './NewFolderModal/NewFolderModal';
import MoveModal from './MoveModal/MoveModal';
import RenameModal from './RenameModal/RenameModal';
import EditorModal from './EditorModal/EditorModal'
import DeleteModal from './DeleteModal/DeleteModal';
import RecoverModal from './RecoverModal/RecoverModal';

class Files extends Component {

    constructor(props) {
        super(props)
        this.upOneLevel = this.upOneLevel.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)

        this.state = {
            menuOpen: false,
            width: window.innerWidth
        };
    }

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    upOneLevel() {
        if (!this.props.selected_folder.is_root) {
            this.props.is_recyclebin
                ? this.props.history.push('/client/' + this.props.match.params.client_id + "/recyclebin/" + this.props.selected_folder.parent_id)
                : this.props.history.push('/client/' + this.props.match.params.client_id + "/files/" + this.props.selected_folder.parent_id)
        }
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth })
    }

    render() {
        const filteredFiles = this.props.is_searching
            ? this.props.all_files.filter(file => { //Search in all files in this client
                //searching logic
                return file.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
            })
            : this.props.files //Nothing to seach, view all files

        const buttonMenuFiles = [
            {
                btnKey: 0,
                img: "UploadFile",
                imgDescr: "Filopplasting",
                btnAction: () => { this.props.toggleUploadModal() }
            },
            {
                btnKey: 1,
                img: "OpenEditor",
                imgDescr: "Tekstbehandling",
                btnAction: () => { this.props.toggleEditorModal() }
            },
            {
                btnKey: 2,
                img: "NewFolder",
                imgDescr: "Ny mappe",
                btnAction: () => { this.props.toggleNewFolderModal() }
            },
            {
                btnKey: 3,
                type: "link",
                to: `/client/${this.props.match.params.client_id}/recyclebin`,
                img: "RecycleBin",
                imgDescr: "Søpplebøtte"
            },
            {
                btnKey: 4,
                type: "link",
                to: `/client/${this.props.match.params.client_id}/accesslog`,
                img: "AccessLog",
                imgDescr: "Adgangslogg"
            }
        ]

        const buttonMenuRecycleBin = []

        return (
            <div >

                {this.props.is_recyclebin ?
                    (<PageNav
                        backBtnType="link"
                        backBtnDescr="Tilbake til kunde"
                        backTo={`/client/${this.props.match.params.client_id}/files`}

                        hasCollapse="false"

                        searchValue={this.props.search}
                        searchAction={this.props.updateSearch}
                        searchPlaceholder="Søk etter filer" 
                        
                        buttons={buttonMenuRecycleBin} />
                    ) : (
                        <PageNav
                            backAction={this.upOneLevel}
                            backBtnDescr="Tilbake et hakk"
                            backIsDisabled={this.props.selected_folder.is_root}

                            searchValue={this.props.search}
                            searchAction={this.props.updateSearch}
                            searchPlaceholder="Søk etter filer"

                            buttons={buttonMenuFiles} />
                    )}

                <Table className="table table-hover">
                    <thead className="thead-dark">

                        {/*  <tr>
                            <th>Type</th>
                            <th>Fil</th>
                            <th>Valg</th>
                        </tr> */}
                    </thead>
                    {
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



                <NewFolderModal />
                <UploadModal />
                <MoveModal />
                <RenameModal />
                <EditorModal />
                <DeleteModal />
                <RecoverModal />

                <TrailUpdater />

            </div>
        )
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        //Initial fetch of data
        const folder = this.props.match.params.selected_folder
        this.props.fetchFilesData(this.props.match.params.client_id, folder, this.props.is_recyclebin)
    }

    /**
     *  This is important, it will be called when the URL changes. That means user has clicked a folder, and we need to react to that. 
     * @param {*} nextProps 
     */

    componentWillReceiveProps(nextProps) {
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
            console.log('mode change')
            //Refetch inventory
            this.props.fetchFilesData(new_params.client_id, new_params.selected_folder, nextProps.is_recyclebin)
        }
    }

    /**
     * Use this to clear the files reducer
     * 
     * We need to do this, to ensure that when a user goes into a new client, no remaining parts of the old client is visible. 
     */

    componentWillUnmount() {
        this.props.clearFiles()
    }

}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state, ownProps) => {
    const { files, deleted_files, root_folder, recyclebin_root, selected_folder, search, is_loading } = state.filesReducer
    const { client_id, client_name } = state.clientReducer

    //Create a variable that selects files that is viewable, based on if prop is set to recyclebin or not
    const viewable_files = ownProps.is_recyclebin ? deleted_files : files
    console.log(files, deleted_files)
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
        is_searching: search !== '',
        is_loading
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilesData: (client_id, selected_folder, is_recyclebin) => { dispatch(fetchFilesData(client_id, selected_folder, is_recyclebin)) },
        selectFolder: (folder_id) => { dispatch(selectFolder(folder_id)) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        toggleNewFolderModal: () => { dispatch(toggleNewFolderModal()) },
        toggleUploadModal: () => { dispatch(toggleUploadModal()) },
        toggleEditorModal: () => { dispatch(toggleEditorModal()) },
        clearFiles: () => { dispatch(clearFiles()) }
    }
}


export default withResizeDetector(withRouter(connect(mapStateToProps, mapDispatchToProps)(Files)))