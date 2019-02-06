import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import FileData from './FileData'
import "./Files.css"
import { Table } from 'reactstrap';
import { Link } from "react-router-dom"

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteFile, fetchFilesData, updateSearch} from '../../../Store/Actions/filesActions'

class Files extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
            <label>Søk etter fil:</label>
            <input type="text" value={this.props.search} placeholder="Søk etter filer..." onChange={this.props.updateSearch.bind(this)}/>
            <Table className="table table-hover">
            <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Tittel</th>
                            <th>Sist endret</th>
                            <th>Slett</th>
                        </tr>
                    </thead>
                {
                    this.props.files.map(file => {
                        return  <FilesTable file={file} deleteFile={this.props.deleteFile} key={file.id}/>
                    })
                }
                </Table>
            </div>
            
        )
    }
     //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
     componentDidMount() {
        this.props.fetchFilesData(this.props.client_id, this.props.selected_folder)
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const {files, root_folder,selected_folder, search} = state.filesReducer
    return {
        //Filter to only display files from selected folder or to handle a search value
        files:files.filter((file) => { 
            return file.parent_id === selected_folder
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
        deleteFile: (id) => { dispatch(deleteFile(id))},
        fetchFilesData: (client_id, selected_folder) =>{ dispatch(fetchFilesData(client_id, selected_folder))},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))}}
}


export default connect(mapStateToProps, mapDispatchToProps)(Files)