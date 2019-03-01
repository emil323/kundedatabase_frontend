import React from 'react'
import { Component } from 'react'
import TrailUpdater from './TrailUpdater'
import FileData from './FileData'
import "./Files.css"

import PrevFolder from '../../../Assets/Icons/prev-folder.png'
import UploadFile from '../../../Assets/Icons/upload-file.png'
import NewFile from '../../../Assets/Icons/add.png'
import NewFolder from '../../../Assets/Icons/new-folder.png'
import KebabVert from '../../../Assets/Icons/kebab-vert.png'
import KebabHor from '../../../Assets/Icons/kebab-hor.png'
import OpenEditor from '../../../Assets/Icons/new-textfile.png'
import AccessLog from '../../../Assets/Icons/access-log.png'
import Trash from '../../../Assets/Icons/trash.png'


import { Tooltip, Dropdown, ButtonToolbar, ButtonGroup, Collapse, Navbar, NavbarBrand, Jumbotron, Table, Alert, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Input } from 'reactstrap';
import { withRouter, Link } from "react-router-dom"




// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { fetchFilesData, selectFolder, updateSearch, clearFiles } from '../../../Store/Actions/filesActions'
import { toggleNewFolderModal, toggleUploadModal, toggleEditorModal } from '../../../Store/Actions/modalActions'
import UploadModal from './UploadModal/UploadModal';
import NewFolderModal from './NewFolderModal/NewFolderModal';
import backBtnImg from '../../../img/backBtn.png'
import newBtnImg from '../../../img/new.png'
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
        };
    }

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    toggleTooltop() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    upOneLevel() {
        if (!this.props.selected_folder.is_root) {
            this.props.is_recyclebin
                ? this.props.history.push('/client/' + this.props.match.params.client_id + "/recyclebin/" + this.props.selected_folder.parent_id)
                : this.props.history.push('/client/' + this.props.match.params.client_id + "/files/" + this.props.selected_folder.parent_id)
        }
    }

    render() {
        const filteredFiles = this.props.is_searching
            ? this.props.all_files.filter(file => { //Search in all files in this client
                //searching logic
                return file.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
            })
            : this.props.files //Nothing to seach, view all files


        return (
            <div >
                {/* 
                <Jumbotron className="Jumbotron-Client">
                    <h1 className="display-3">{this.props.client_name}</h1>
                    {
                        this.props.is_recyclebin ? <h3>Papirkurv</h3> : ''
                    }
                    <hr />


                    <Button className="hidden-xs hidden-sm hidden-md" color="primary" onClick={this.props.toggleUploadModal} >Last opp</Button>
                    <Button className="hidden-xs hidden-sm hidden-md" color="primary" onClick={this.props.toggleNewFolderModal}>Ny mappe</Button>
                    <Button className="hidden-xs hidden-sm hidden-md" color="primary" onClick={this.props.toggleEditorModal}>Nytt dokument</Button>
                    <Link to={`/client/${this.props.match.params.client_id}/accesslog`}><Button color="primary">Adgangslogg</Button></Link>
                    {
                    this.props.is_recyclebin 
                    ?  <Button onClick={() => this.props.history.push('/client/' + this.props.match.params.client_id + "/files/")}>Gå tilbake</Button> 
                    :  <Button onClick={() => this.props.history.push('/client/' + this.props.match.params.client_id + "/recyclebin/")}>Papirkurv</Button>
                    }
                    <input className="searchFiles" type="text" value={this.props.search} placeholder="Søk etter filer..." onChange={this.props.updateSearch} />

                </Jumbotron>
                */}


                {/*
                <Row className="row">
                    <Col sm="0" lg="9" >
                        <div className="buttonMenu hidden-xs hidden-sm">
                            <Button color="primary" onClick={this.props.toggleUploadModal} >Last opp</Button>
                            <Button color="primary" onClick={this.props.toggleNewFolderModal}>Ny mappe</Button>
                            <Button color="primary" onClick={this.props.toggleEditorModal}>Nytt dokument</Button>
                        </div>

                    </Col>
                    <Col sm="12" lg="3">
                        <input className="searchFiles" type="text" value={this.props.search} placeholder="Søk etter filer..." onChange={this.props.updateSearch} />
                    </Col>
                </Row>
                
            <Row>
                    <Col xs="1" ><UploadModal buttonLabel="Last Opp"/> </Col>
                    <Col xs="2"><NewFolderModal buttonLabel="Ny mappe"/></Col>
                    <Col xs="3"><Button className="backBtn" disabled={this.props.selected_folder.is_root} onClick={this.upOneLevel}>Opp et nivå</Button></Col>
            </Row>
            */}

                <Navbar sticky="top" color="faded">
                    <ButtonGroup className="btn-group-left">
                        {
                            this.props.selected_folder.is_root ? (<button className="btn-vector" disabled><img id="previous-folder" className="btn-vector-img" src={PrevFolder} alt="" /></button>) :
                                <button className="btn-vector" disabled={this.props.selected_folder.is_root} onClick={this.upOneLevel}><img id="#previous-folder" className="btn-vector-img" src={PrevFolder} alt="" /></button>
                        }
                    <button onClick={this.toggleMenu} className="btn-vector"><img className="btn-vector-img" src={KebabHor} /></button>

                    </ButtonGroup>


                    <Collapse isOpen={this.state.menuOpen}>

                        <ButtonGroup id="filesMenuGroup" className="btn-group-right testGroup">
                            <button className="btn-vector" onClick={this.props.toggleUploadModal}>
                                <img className="btn-vector-img" src={UploadFile} /></button>
                            <button className="btn-vector" onClick={this.props.toggleEditorModal}>
                                <img className="btn-vector-img" src={OpenEditor} /></button>
                            <button className="btn-vector" onClick={this.props.toggleNewFolderModal} >
                                <img className="btn-vector-img" src={NewFolder} /></button>
                            <Link to={`/client/${this.props.match.params.client_id}/accesslog`}>
                                <button className="btn-vector"><img className="btn-vector-img" src={AccessLog} /></button></Link>
                            <Link to={`/client/${this.props.match.params.client_id}/recyclebin`}><
                                button className="btn-vector"><img className="btn-vector-img" src={Trash} /></button></Link>
                        </ButtonGroup>
                        <Input className="searchFiles" type="text" value={this.props.search} placeholder="Søk etter filer" onChange={this.props.updateSearch} />

                    </Collapse>

                </Navbar>

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
                    {!this.props.is_searching && filteredFiles.length === 0 ?
                        <tr>
                            <td colspan="4">
                                <Alert color="light">
                                    <p className="text-center">
                                        Her er det tomt.
                              </p>
                                </Alert>
                            </td>
                        </tr>
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
    const { files, deleted_files, root_folder, recyclebin_root, selected_folder, search } = state.filesReducer
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
        is_searching: search !== ''
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Files))