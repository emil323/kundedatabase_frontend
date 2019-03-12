import React, { Component } from 'react'
import './NavBtn.css'

// Imports all icons
import ArrowBack from '../../../Assets/Icons/arrow-back.png'
import ArrowPrevFolder from '../../../Assets/Icons/arrow-prev-folder.png'
import UploadFile from '../../../Assets/Icons/upload-file.png'
import NewClient from '../../../Assets/Icons/new-client.png'
import NewFile from '../../../Assets/Icons/add.png'
import NewFolder from '../../../Assets/Icons/new-folder.png'
import KebabVert from '../../../Assets/Icons/kebab-vert.png'
import KebabHor from '../../../Assets/Icons/kebab-hor.png'
import OpenEditor from '../../../Assets/Icons/new-textfile.png'
import AccessLog from '../../../Assets/Icons/access-log.png'
import RecycleBin from '../../../Assets/Icons/recycle-bin.png'
import Up from '../../../Assets/Icons/up.png'
import Down from '../../../Assets/Icons/down.png'
import Home from '../../../Assets/Icons/home.png'
import Download from '../../../Assets/Icons/download-file.png'
import Folder from '../../../Assets/Icons/folder.png'

class NavBtn extends Component {
    constructor(props) {
        super(props)

        this.getImg = this.getImg.bind(this)
    }

    getImg(name) {
        switch (name) {
            case 'AccessLog': return AccessLog
            case 'ArrowBack': return ArrowBack
            case 'ArrowPrevFolder': return ArrowPrevFolder
            case 'Down': return Down
            case 'Folder': return Folder
            case 'Home': return Home
            case 'NewClient': return NewClient
            case 'NewFile': return NewFile
            case 'NewFolder': return NewFolder
            case 'KebabHor': return KebabHor
            case 'KebabVert': return KebabVert
            case 'OpenEditor': return OpenEditor
            case 'UploadFile': return UploadFile
            case 'RecycleBin': return RecycleBin
            case 'Up': return Up
            case 'Download': return Download
            default: return null
        }
    }

    render() {
        return (
            <button
                className={this.props.isBackBtn ? "btn-vector btn-vector-back" : "btn-vector"}
                onClick={this.props.action}
                disabled={this.props.isDisabled}>
                <img
                    className={this.props.isCard ? "btn-vector-img btn-vector-img-card" : "btn-vector-img"}
                    src={this.getImg(this.props.img)}
                    alt={this.props.descr} />
                {this.props.isCard ? '' : (<p
                    className={this.props.isBackBtn ? "btn-vector-descr btn-vector-descr-back" : "btn-vector-descr"}>
                    {this.props.descr}
        </p>)}
            </button>
        )
    }
}

export default NavBtn