import React from 'react'
import { Component } from 'react'
import api from '../../../API/API'
import FileData from './FileData'
import "./Files.css"
import { Table, Alert, Col, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from "react-router-dom"

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import {fetchFilesData, selectFolder,updateSearch} from '../../../Store/Actions/filesActions'
import { toggleNewFolderModal, toggleUploadModal, toggleEditorModal } from '../../../Store/Actions/modalActions'
import UploadModal from './UploadModal/UploadModal';
import NewFolderModal from './NewFolderModal/NewFolderModal';
import backBtnImg from '../../../img/backBtn.png'
import newBtnImg from '../../../img/new.png'
import MoveModal from './MoveModal/MoveModal';
import RenameModal from './RenameModal/RenameModal';
import EditorModal from './EditorModal/EditorModal'
import DeleteModal from './DeleteModal/DeleteModal';

class Files extends Component {

    constructor(props) {
        super(props)
        this.upOneLevel = this.upOneLevel.bind(this)

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    upOneLevel() {
        if (!this.props.selected_folder.is_root) {
            this.props.history.push('/client/' + this.props.match.params.client_id + "/" + this.props.selected_folder.parent_id)
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
            <div className="container" >
            <input className="searchFiles" type="text" value={this.props.search} placeholder="Søk etter filer..." onChange={this.props.updateSearch} />

                {/*}
            <Row>
                    <Col xs="1" ><UploadModal buttonLabel="Last Opp"/> </Col>
                    <Col xs="2"><NewFolderModal buttonLabel="Ny mappe"/></Col>
                    <Col xs="3"><Button className="backBtn" disabled={this.props.selected_folder.is_root} onClick={this.upOneLevel}>Opp et nivå</Button></Col>
            </Row>
            */}


                <Table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Type</th>
                            <th>Tittel</th>
                            <th>Sist endret</th>
                            <th>Valg</th>
                        </tr>
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
                    {
                        filteredFiles.map(file => {
                            return <FileData file={file}  key={file.id} />
                        })
                    }
                </Table>
                {
                    this.props.selected_folder.is_root ? '' :
                        <Button className="backBtn menuBtn" disabled={this.props.selected_folder.is_root} onClick={this.upOneLevel}><img src={backBtnImg} className="btnImg" /></Button>
                }

                <ButtonDropdown className="menuBtn btnGroupNew" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret className="menuBtn">
                        <img className="btnImg" src={newBtnImg}></img>
                    </DropdownToggle>
                    <DropdownMenu className="menuBtnContent">
                        <Button onClick={this.props.toggleEditorModal} className="dropUpBtn">Ny tekstfil</Button>
                        <DropdownItem divider />
                        <Button onClick={this.props.toggleUploadModal} className="dropUpBtn"> Last opp filer</Button>
                        <DropdownItem divider />
                        <Button onClick={this.props.toggleNewFolderModal} className="dropUpBtn">Ny mappe</Button>
                    </DropdownMenu>
                </ButtonDropdown>

                <NewFolderModal/>
                <UploadModal/>
                <MoveModal/>
                <RenameModal/>
                <EditorModal />
                <DeleteModal />
            </div>
        )
    }
    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
  
    componentDidMount() {
        //Initial fetch of data
        const folder = this.props.match.params.selected_folder !== null ? this.props.match.params.selected_folder : this.props.selected_folder.id
        this.props.fetchFilesData(this.props.match.params.client_id, folder)
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
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const { files, root_folder, selected_folder, search } = state.filesReducer
    return {
        //Filter to only display files from selected folder or to handle a search value
        files: files.filter((file) => {
            return file.parent_id === selected_folder.id
            //TODO:Handle search value
        }),
        all_files: files,
        root_folder,
        selected_folder,
        search,
        is_searching: search !== ''
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilesData: (client_id, selected_folder) => { dispatch(fetchFilesData(client_id, selected_folder)) },
        selectFolder: (folder_id) => {dispatch(selectFolder(folder_id))},
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        toggleNewFolderModal:() => {dispatch(toggleNewFolderModal())},
        toggleUploadModal:() => {dispatch(toggleUploadModal())},
        toggleEditorModal:() => {dispatch(toggleEditorModal())}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Files))