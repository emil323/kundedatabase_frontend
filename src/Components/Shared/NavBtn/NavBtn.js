import React, { Component } from 'react'
import './NavBtn.css'

// Imports all icons
import ArrowBack from '../../../Assets/Icons/arrow-back.png'
import ArrowPrevFolder from '../../../Assets/Icons/arrow-prev-folder.png'
import UploadFile from '../../../Assets/Icons/upload-white.png'
import NewClient from '../../../Assets/Icons/new-client.png'
import NewFile from '../../../Assets/Icons/add.png'
import NewFolder from '../../../Assets/Icons/new-folder.png'
import KebabVert from '../../../Assets/Icons/kebab-vert.png'
import KebabHor from '../../../Assets/Icons/kebab-hor.png'
import OpenEditor from '../../../Assets/Icons/new-doc.png'
import AccessLogWhite from '../../../Assets/Icons/accesslog-white.png'
import AccessLogBlack from '../../../Assets/Icons/accesslog-black.png'
import TrashWhite from '../../../Assets/Icons/trash-white.png'
import TrashBlack from '../../../Assets/Icons/trash-black.png'
import ExpandLessWhite from '../../../Assets/Icons/expand-less-white.png'
import ExpandMoreWhite from '../../../Assets/Icons/expand-more-white.png'
import ExpandLessBlack from '../../../Assets/Icons/expand-less-black.png'
import ExpandMoreBlack from '../../../Assets/Icons/expand-more-black.png'
import Home from '../../../Assets/Icons/home.png'
import Download from '../../../Assets/Icons/download-white.png'
import Folder from '../../../Assets/Icons/folder.png'
import Edit from '../../../Assets/Icons/edit.png'
import Search from '../../../Assets/Icons/search.png'
import ArrowRightWhite from '../../../Assets/Icons/arrow_right_white.png'
import EasyReportWhite from '../../../Assets/Icons/easy_report_white.png'
import FolderWhite from '../../../Assets/Icons/folder_white.png'

class NavBtn extends Component {
    constructor(props) {
        super(props)

        this.getImg = this.getImg.bind(this)
    }

    getImg(name) {
        switch (name) {
            case 'AccessLogWhite': return AccessLogWhite
            case 'AccessLogBlack': return AccessLogBlack
            case 'ArrowBack': return ArrowBack
            case 'ArrowPrevFolder': return ArrowPrevFolder
            case 'Folder': return Folder
            case 'FolderWhite': return FolderWhite
            case 'Home': return Home
            case 'NewClient': return NewClient
            case 'NewFile': return NewFile
            case 'NewFolder': return NewFolder
            case 'KebabHor': return KebabHor
            case 'KebabVert': return KebabVert
            case 'OpenEditor': return OpenEditor
            case 'UploadFile': return UploadFile
            case 'TrashWhite': return TrashWhite
            case 'TrashBlack': return TrashBlack
            case 'Download': return Download
            case 'Edit': return Edit
            case 'Add': return NewFile
            case 'Search': return Search
            case 'ExpandMoreWhite': return ExpandMoreWhite
            case 'ExpandLessWhite': return ExpandLessWhite
            case 'ExpandMoreBlack': return ExpandMoreBlack
            case 'ExpandLessBlack': return ExpandLessBlack
            case 'ArrowRightWhite': return ArrowRightWhite
            case 'EasyReportWhite': return EasyReportWhite
            default: return null
        }
    }

    render() {
        return (
            <button
                className={"btn-vector"}
                onClick={this.props.action}
                disabled={this.props.isDisabled}>
                <img
                    className={this.props.isCard ? "btn-vector-img btn-vector-img-card" : "btn-vector-img"}
                    src={this.getImg(this.props.img)}
                    alt={this.props.descr} />
                {this.props.children}
                {this.props.isCard || !this.props.isCollapseBtn ? '' : (<span
                    className={"btn-vector-descr"}>
                    {this.props.descr}
                </span>)}
            </button>
        )
    }
}

export default NavBtn