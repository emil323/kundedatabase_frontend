import React from 'react'
import word from "../../../Assets/Icons/word.png"
import pdf from "../../../Assets/Icons/pdf.png"
import excel from "../../../Assets/Icons/excel.png"
import textDoc from "../../../Assets/Icons/txt.png"
import folder from "../../../Assets/Icons/folder.png"

import { connect } from "react-redux";
import { fetchFilesData} from '../../../Store/Actions/filesActions'
import { Link, withRouter } from "react-router-dom";
import { Component } from 'react'
import {Button} from 'reactstrap'
import API from '../../../API/API';

 class FilesTable extends Component {
     constructor(props){
         super(props)
         this.handleSelection = this.handleSelection.bind(this)
     }




    handleSelection = (e) => {
        e.preventDefault()
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
                        <td><Link to="" onClick={(e) => {this.handleSelection(e)}}>{this.props.file.name}</Link></td>
                        <td>{this.props.file.last_changed}</td>
                        <td><Button>Recover</Button></td>
                    </tr>
                </tbody>
            )

            
        }    


}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const {root_folder,selected_folder, search} = state.recyclebinReducer
    return {
        root_folder,
        selected_folder,
        search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilesData: (client_id, selected_folder) =>{ dispatch(fetchFilesData(client_id, selected_folder,true))},
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilesTable))