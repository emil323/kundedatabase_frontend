import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import FilesTable from './FilesTable'
import AddFile from "./AddFile"
import "./Files.css"
import { Table } from 'reactstrap';

class Files extends Component {
    constructor(props){
        super(props);
        this.state = {
            files:[],
            search: ""
        }
    }
   
    componentDidMount() {
        api.files().list().then(res => {
            console.log(res)
            this.setState(res.data)
        }).catch(function(error) {
            console.log(error)
        })
    }

    deleteFile = (id) => {
        const files = this.state.files.filter(file => {
            return file.id !== id
        })
        this.setState({
            files: files
        })
    }

    addFile = (file) => {
        let id;
        if(this.state.files.length > 0){
            id = this.state.files[this.state.files.length - 1].id + 1;
        }else{
            id = 0;
        }

        file.id = id;
        let files = [...this.state.files, file];
        this.setState({
            files: files
        })
    }

    updateSearch(e){
        this.setState({
            search: e.target.value.substr(0,20)
        })
    }

    

    render() {
        let filteredFiles = this.state.files.filter(file => {
            return file.tittel.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
            <Table className="table table-hover">
            <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Tittel</th>
                            <th>Type</th>
                            <th>Sist endret</th>
                            <th>Slett</th>
                        </tr>
                    </thead>
                {
                    filteredFiles.map(file => {
                        return  <FilesTable files={file} deleteFile={this.deleteFile} key={file.id}/>
                    })
                }
                </Table>
                <AddFile addFile={this.addFile}/>
                <label>Søk etter fil:</label>
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
            </div>
        )
    }
}

export default Files