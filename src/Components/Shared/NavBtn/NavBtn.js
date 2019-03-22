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
import Apps from '../../../Assets/Icons/apps.png'
import Restore from '../../../Assets/Icons/restore.png'
import ArrowForward from '../../../Assets/Icons/arrow-forward.png'
import Settings from '../../../Assets/Icons/settings.png'
import Clients from '../../../Assets/Icons/clients.png'
import UserAcces from '../../../Assets/Icons/user-access.png'


class NavBtn extends Component {
    constructor(props) {
        super(props)

        this.getImg = this.getImg.bind(this)
        this.getBtnClass = this.getBtnClass.bind(this)
        this.getImgClass = this.getImgClass.bind(this)

    }

    getImg(name) {
        switch (name) {
            case 'AccessLogWhite': return AccessLogWhite
            case 'AccessLogBlack': return AccessLogBlack
            case 'ArrowBack': return ArrowBack
            case 'ArrowPrevFolder': return ArrowPrevFolder
            case 'Apps': return Apps
            case 'Folder': return Folder
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
            case 'Restore': return Restore
            case 'ArrowForward': return ArrowForward
            case 'Settings': return Settings
            case 'Clients': return Clients
            case 'UserAccess': return UserAcces
            default: return null
        }
    }

    getBtnClass(contextClass) {
        switch (contextClass) {
            case ("collapse"): return "btn-collapse btn-vector"
            case ("navbar"): return "btn-navbar btn-vector"
            case ("card"): return "btn-card btn-vector"
            case ("pagenav"): return "btn-pagenav btn-vector"
            case ("brand"): return "btn-brand btn-vector"
            case ("kebab"): return "btn-kebab btn-vector"
            default: return "btn-vector"
        }
    }

    getImgClass(contextClass) {
        switch (contextClass) {
            case ("collapse"): return "btn-img-collapse btn-vector-img"
            case ("navbar"): return "btn-img-navbar btn-vector-img"
            case ("card"): return "btn-img-card btn-vector-img"
            case ("pagenav"): return "btn-img-pagenav btn-vector-img"
            case ("brand"): return "btn-img-brand btn-vector-img"
            case ("kebab"): return "btn-img-kebab btn-vector-img"
            default: return "btn-vector-img"
        }
    }

    render() {
        return (
            <button
                className={this.getBtnClass(this.props.contextClass)}
                onClick={this.props.action}
                disabled={this.props.isDisabled}>

                <img
                    className={this.getImgClass(this.props.contextClass)}
                    src={this.getImg(this.props.img)}
                    alt={this.props.descr} />

                {this.props.children}

                {this.props.showDescr ? (<p
                    className={"btn-vector-descr"}>
                    {this.props.descr}
                </p>) : null}
            </button>
        )
    }
}

export default NavBtn