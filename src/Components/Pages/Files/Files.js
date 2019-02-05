import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import FilesTable from './FilesTable'
import AddFile from "./AddFile"
import "./Files.css"
import { Table } from 'reactstrap';

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteFile, fetchFilesData, updateSearch} from '../../../Store/Actions/filesActions'

class Files extends Component {

    goToAddFile = () => {
        this.props.history.push("/addfile")
    }

    render() {
        let filteredFiles = this.props.files.filter(file => {
            return file.tittel.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
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
                    filteredFiles.map(file => {
                        return  <FilesTable file={file} deleteFile={this.props.deleteFile} key={file.id}/>
                    })
                }
                </Table>
                <label>Søk etter fil:</label>
                <input type="text" value={this.props.search} onChange={this.props.updateSearch.bind(this)}/>
                <input type="button" value="Go to Add File" onClick={this.goToAddFile}/>
            </div>
        )
    }
     //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
     componentDidMount() {
        this.props.fetchFilesData()
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        files: state.filesReducer.files,
        search: state.filesReducer.search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteFile: (id) => { dispatch(deleteFile(id))},
        fetchFilesData: () =>{ dispatch(fetchFilesData())},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))}}
}


export default connect(mapStateToProps, mapDispatchToProps)(Files)