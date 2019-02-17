import React from 'react'
import word from "../../../Assets/Icons/word.png"
import pdf from "../../../Assets/Icons/pdf.png"
import excel from "../../../Assets/Icons/excel.png"
import textDoc from "../../../Assets/Icons/txt.png"
import folder from "../../../Assets/Icons/folder.png"

import { connect } from "react-redux";
import { fetchFilesData, toggleMoveModal, toggleRenameModal} from '../../../Store/Actions/filesActions'
import {addLogItem} from '../../../Store/Actions/accesslogActions'
import { Link, withRouter } from "react-router-dom";
import { Component } from 'react'
import DropdownBtn from '../../DropdownBtn/DropdownBtn';
import API from '../../../API/API';

 class FilesTable extends Component {
     constructor(props){
         super(props)
         this.handleSelection = this.handleSelection.bind(this)
         this.state = {
            name: ''
        }
     }


    updateAccesslog = () => {
        API.accesslog().create({
            file: this.props.file.name,
            client: this.state.name
        })
        .then(res => {
          this.props.fetchAccessLogData()
        })
        .catch(err => {
          console.log(err)
        })
        
    }

    handleSelection = (e) => {
        e.preventDefault()

        const {file} = this.props
    
        if(file.is_directory) 
            this.props.history.push('/client/' + file.client_id + "/"  + file.id)
         else //Download file
            API.file(file.id).download().then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.name);
                document.body.appendChild(link);
                link.click()
            })
        
    }

     
    checkFileType = (type) => {
        switch(type){
            case "WORD":
                return word
            case "pdf":
                return pdf
            case "EXCEL":
                return excel
            case "folder":
                return folder     
            case "image/png":
                return pdf
            break;    
            default:
                return textDoc
        }
    }

        render(){
        
            const btnOptions =  [
                { tekst: 'Behandle', isHeader: 1, key: 1 },
                { tekst: 'Vis', isHeader: 0, key: 2 },
                { tekst: 'Endre navn', isHeader: 0, key: 3, function: () => {this.props.toggleRenameModal(this.props.file)}},
                { tekst: 'Flytt', isHeader: 0, key: 5, function: ()=> {this.props.toggleMoveModal(this.props.file)}}
            ]

            return(
                <tbody>
                    <tr>
                        <td><img src={this.checkFileType(this.props.file.type)} alt="s"/></td>
                        <td><Link to="" onClick={(e) => {this.updateAccesslog(); this.handleSelection(e)}}>{this.props.file.name}</Link></td>
                        <td>{this.props.file.last_changed}</td>
                        <td><DropdownBtn file={this.props.file} options={btnOptions} /></td>
                    </tr>
                </tbody>
            )

            
        }    

        componentDidMount() {
            const {client_id} = this.props.match.params
            API.client(client_id).get()
                .then((response) => {
                    this.setState({name: response.data.name})
                })
        }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const {root_folder,selected_folder, search} = state.filesReducer
    return {
        root_folder,
        selected_folder,
        search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilesData: (client_id, selected_folder) =>{ dispatch(fetchFilesData(client_id, selected_folder))},
        toggleMoveModal: (file) => {dispatch(toggleMoveModal(file))},
        addLogItem: (logItem) => { dispatch(addLogItem(logItem))},
        toggleRenameModal:(file) => {dispatch(toggleRenameModal(file))}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilesTable))