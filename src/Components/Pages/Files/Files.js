import React from 'react'
import { Component } from 'react'
import api from '../../../API/API'
import FileData from './FileData'
import "./Files.css"
import { Table, Row, Col, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from "react-router-dom"

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import {fetchFilesData, updateSearch, toggleNewFolderModal, toggleUploadModal } from '../../../Store/Actions/filesActions'
import UploadModal from './UploadModal/UploadModal';
import NewFolderModal from './NewFolderModal/NewFolderModal';
import backBtnImg from '../../../img/backBtn.png'
import newBtnImg from '../../../img/new.png'
import MoveModal from './MoveModal/MoveModal';

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
            this.props.history.push('/client/' + this.props.client_id + "/" + this.props.selected_folder.parent_id)
        }
    }

    render() {
        let filteredFiles = this.props.files.filter(file => {
            return file.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })
        return (
            <div className="container" >
            <input className="searchFiles" type="text" value={this.props.search} placeholder="Søk etter filer..." onChange={this.props.updateSearch.bind(this)} />

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
                        filteredFiles.map(file => {
                            return <FileData file={file} deleteFile={this.props.deleteFile} key={file.id} />
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
                        <Button onClick={this.props.toggleUploadModal} className="dropUpBtn"> Last opp filer</Button>
                        <DropdownItem divider />
                        <Button onClick={this.props.toggleNewFolderModal} className="dropUpBtn">Ny mappe</Button>
                    </DropdownMenu>
                </ButtonDropdown>

                <NewFolderModal/>
                <UploadModal/>
                <MoveModal/>
            </div>
        )
    }
    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        const folder = this.props.folder !== null ? this.props.folder : this.props.selected_folder.id
        this.props.fetchFilesData(this.props.client_id, folder)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.folder !== nextProps.folder) {
            this.props.fetchFilesData(nextProps.client_id, nextProps.folder)
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
        root_folder,
        selected_folder,
        search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilesData: (client_id, selected_folder) => { dispatch(fetchFilesData(client_id, selected_folder)) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        toggleNewFolderModal:() => {dispatch(toggleNewFolderModal())},
        toggleUploadModal:() => {dispatch(toggleUploadModal())}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Files))