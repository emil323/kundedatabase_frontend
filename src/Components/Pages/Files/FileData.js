import React from 'react'
import word from "../../../Assets/Icons/word.png"
import pdf from "../../../Assets/Icons/pdf.png"
import excel from "../../../Assets/Icons/excel.png"
import textDoc from "../../../Assets/Icons/txt.png"
import folder from "../../../Assets/Icons/folder.png"
import horizontalDropdown from '../../../Assets/Icons/horizontalDropdown.png'

import { connect } from "react-redux";
import { fetchFilesData } from '../../../Store/Actions/filesActions'
import { toggleMoveModal, toggleRenameModal, toggleDeleteModal, toggleRecoverModal } from '../../../Store/Actions/modalActions'
import { Link, withRouter } from "react-router-dom";
import { Component } from 'react'
import DropdownBtn from '../../DropdownBtn/DropdownBtn';
import { Button } from 'reactstrap'
import API from '../../../API/API';

class FilesTable extends Component {
    constructor(props) {
        super(props)
        this.handleSelection = this.handleSelection.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }

    handleSelection = (e) => {
        e.preventDefault()

        const { file } = this.props
        console.log(file)
        if (file.is_directory) {
            this.props.file.is_deleted
                ? this.props.history.push('/client/' + file.client_id + "/recyclebin/" + file.id)
                : this.props.history.push('/client/' + file.client_id + "/files/" + file.id)
        }
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
        switch (type) {
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
            default:
                return textDoc
        }
    }

    formatDate(date) {
        const format = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString('no-NO', format)
    }

    render() {

        const btnOptions = [
            { tekst: 'Endre navn', isHeader: 0, key: 0, function: () => { this.props.toggleRenameModal(this.props.file) } },
            { tekst: 'Flytt', isHeader: 0, key: 1, function: () => { this.props.toggleMoveModal(this.props.file) } },
            { tekst: 'Slett', isHeader: 0, key: 2, function: () => { this.props.toggleDeleteModal(this.props.file) } }
        ]

        return (
            <tbody  >
                <tr>
                    <td><img src={this.checkFileType(this.props.file.type)} alt="s" /></td>

                    <td className="word_break"><Link to=""  onClick={(e) => { 
                        this.handleSelection(e) }}>{this.props.is_searching ? this.props.file.fullpath :this.props.file.name
                        }</Link>
                        <br /><p className="date">{this.formatDate(this.props.file.last_changed)}</p>
                    </td>

                    {this.props.file.is_deleted
                        ? <td><Button onClick={() => this.props.toggleRecoverModal(this.props.file)}>Gjenopprett</Button></td>
                        : <td><DropdownBtn icon={horizontalDropdown} options={btnOptions} /></td>
                    }
                </tr>
            </tbody>
        )


    }


}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const { root_folder, selected_folder, search } = state.filesReducer
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
        toggleRecoverModal: (file) => { dispatch(toggleRecoverModal(file)) }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilesTable))