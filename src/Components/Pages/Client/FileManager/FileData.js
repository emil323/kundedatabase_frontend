import React from 'react'
import word from "../../../../Assets/Icons/Files/doc.png"
import pdf from "../../../../Assets/Icons/Files/pdf.png"
import excel from "../../../../Assets/Icons/Files/excel.png"
import textDoc from "../../../../Assets/Icons/Files/txt.png"
import powerp from "../../../../Assets/Icons/Files/powerp.png"
import file from "../../../../Assets/Icons/Files/file.png"
import img from "../../../../Assets/Icons/Files/img.png"
import folder from "../../../../Assets/Icons/folder.png"
import Kebab from '../../../../Assets/Icons/kebab-hor.png'

import { connect } from "react-redux";
import {fetchFilesData, selectFile} from '../../../../Store/Actions/filesActions'
import { toggleMoveModal, toggleRenameModal, toggleDeleteModal, toggleRecoverModal } from '../../../../Store/Actions/modalActions'
import { Link, withRouter } from "react-router-dom";
import { Component } from 'react'
import DropdownBtn from '../../../Shared/DropdownBtn/DropdownBtn';
import { Button } from 'reactstrap'
import API from '../../../../API/API';
import NavBtn from '../../../Shared/NavBtn/NavBtn';
import {formatDate} from '../../../Helpers/Formatting/DateHelper'
import {isAdmin} from '../../../Helpers/AdminChecker/AdminChecker'

class FilesTable extends Component {
    constructor(props) {
        super(props)
        this.handleSelection = this.handleSelection.bind(this)
    }

    handleSelection = (e) => {
        e.preventDefault()

        const { file } = this.props
        console.log('FILE SELECTED',file)
        if (file.is_directory) {
            this.props.file.is_deleted
                ? this.props.history.push('/client/' + file.client_id + "/recyclebin/" + file.id)
                : this.props.history.push('/client/' + file.client_id + "/files/" + file.id)
        }
        else if(file.is_deleted && !file.is_directory) { 
            this.props.toggleRecoverModal(this.props.file)
        } else {
            //Naviagte to file
            this.props.selectFile(file.id)
            this.props.history.push('/file/' + file.id)
        }
    }

    checkFileType = (type) => {
        switch (type) {
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return word

            case "application/pdf":
                return pdf

            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
                return excel

            case "folder":
                return folder

            case "image/png":
            case "image/jpg":
            case "image/jpeg":
                return img

            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return powerp

            default:
                return file
        }
    }



    render() {

        const btnOptions = [
            {
                tekst: 'Endre navn',
                isHeader: 0,
                key: 1,
                function: () => { this.props.toggleRenameModal(this.props.file) }
            },
            {
                tekst: 'Flytt',
                isHeader: 0,
                key: 2,
                function: () => { this.props.toggleMoveModal(this.props.file) }
            },
            {
                tekst: 'Slett',
                isHeader: 0,
                key: 3,
                function: () => { this.props.toggleDeleteModal(this.props.file) }
            }
        ]

        if(isAdmin) {
            btnOptions.push({
                tekst: 'Adgangslogg',
                isHeader: 0,
                key: 4,
                function: () => { this.props.history.push('/accesslog/file/' + this.props.file.id) }
            })
        }

        return (
            <tbody>
                <tr className="file-tr">
                    <td className="td-file-icon"><img className="vector-img" src={this.checkFileType(this.props.file.type)} alt={this.props.file.type} /></td>

                    <td className="word_break td-file-title">
                    
                    <Link  to="" onClick={(e) => {
                        this.handleSelection(e)
                    }}>{this.props.is_searching ? this.props.file.fullpath : this.props.file.name
                        }</Link> 
                        <br /><span className="date">{formatDate(this.props.file.last_changed)}</span>
                    </td>

                    {this.props.file.is_deleted  
                        ? <td className="td-btn"><NavBtn img="Restore" action={() => this.props.toggleRecoverModal(this.props.file)} /></td>
                        : <td className="td-btn"><DropdownBtn icon={Kebab} options={btnOptions} /></td>
                    }
                </tr>
            </tbody>
        )
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const {search} = state.navReducer
    const { root_folder, selected_folder } = state.filesReducer
    return {
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
        toggleMoveModal: (file) => { dispatch(toggleMoveModal(file)) },
        toggleRenameModal: (file) => { dispatch(toggleRenameModal(file)) },
        toggleDeleteModal: (file) => { dispatch(toggleDeleteModal(file)) },
        toggleRecoverModal: (file) => { dispatch(toggleRecoverModal(file)) },
        selectFile:(file_id) => {dispatch(selectFile(file_id))}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilesTable))