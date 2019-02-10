import React from 'react'
import word from "../../../Assets/Icons/word.png"
import pdf from "../../../Assets/Icons/pdf.png"
import excel from "../../../Assets/Icons/excel.png"
import textDoc from "../../../Assets/Icons/txt.png"
import folder from "../../../Assets/Icons/folder.png"

import { connect } from "react-redux";
import { deleteFile, fetchFilesData, updateSearch,changeFolder} from '../../../Store/Actions/filesActions'
import { Link, withRouter } from "react-router-dom";
import { Component } from 'react'
import DropdownBtn from '../../DropdownBtn/DropdownBtn';
import API from '../../../API/API';

 class FilesTable extends Component {
     constructor(props){
         super(props)
         this.handleSelection = this.handleSelection.bind(this)
     }

    handleSelection(e) {
        e.preventDefault()

        const {file} = this.props
    
        if(file.is_directory) 
            this.props.history.push('/client/' + file.client_id + "/"  + file.id)
         else 
            window.open(API.files().getURL(file.id, file.name), "_blank")
        
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
            return(
                <tbody>
                    <tr>
                        <td><img src={this.checkFileType(this.props.file.type)} alt="s"/></td>
                        <td><Link to="" onClick={this.handleSelection}>{this.props.file.name}</Link></td>
                        <td>{this.props.file.last_changed}</td>
                        <td><DropdownBtn options={this.props.btnOptions} /></td>
                    </tr>
                </tbody>
            )
        }    
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const {files, root_folder,selected_folder, search} = state.filesReducer
    return {
        root_folder,
        selected_folder,
        search,
        btnOptions: [
            { tekst: 'Behandle', isHeader: 1, key: 1 },
            { tekst: 'Vis', isHeader: 0, key: 2 },
            { tekst: 'Slett', isHeader: 0, key: 3, function: () => { return this.props.deleteFile(this.props.file.id)}},
            { tekst: 'Test', isHeader: 1, key: 4 },
            { tekst: 'Placeholder', isHeader: 0, key: 5, },
        ]
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteFile: (id) => { dispatch(deleteFile(id))},
        fetchFilesData: (client_id, selected_folder) =>{ dispatch(fetchFilesData(client_id, selected_folder))},
        changeFolder: (folder) => {dispatch(changeFolder(folder))}
       }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilesTable))