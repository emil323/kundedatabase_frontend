import React, { Component } from 'react'
import './NavBtn.css'
import BtnTooltip from './BtnTooltip'

// Imports all icons
import AddBlack from '../../../Assets/Icons/add-black.png'
import AddWhite from '../../../Assets/Icons/add-white.png'
import ArrowBack from '../../../Assets/Icons/arrow-back.png'
import ArrowPrevFolderWhite from '../../../Assets/Icons/arrow-prev-folder-white.png'
import ArrowPrevFolderBlack from '../../../Assets/Icons/arrow-prev-folder-black.png'
import ArrowNextFolderWhite from '../../../Assets/Icons/arrow-next-folder-white.png'
import ArrowNextFolderBlack from '../../../Assets/Icons/arrow-next-folder-black.png'
import ArrowForwardBlack from '../../../Assets/Icons/arrow-forward-black.png'
import ArrowForwardWhite from '../../../Assets/Icons/arrow-forward-white.png'
import UploadWhite from '../../../Assets/Icons/upload-white.png'
import UploadBlack from '../../../Assets/Icons/upload-black.png'
import NewClient from '../../../Assets/Icons/new-client.png'
import NewFolderBlack from '../../../Assets/Icons/new-folder-black.png'
import NewFolderWhite from '../../../Assets/Icons/new-folder-white.png'
import KebabVert from '../../../Assets/Icons/kebab-vert.png'
import KebabHor from '../../../Assets/Icons/kebab-hor.png'
import AccessLogWhite from '../../../Assets/Icons/accesslog-white.png'
import AccessLogBlack from '../../../Assets/Icons/accesslog-black.png'
import TrashWhite from '../../../Assets/Icons/trash-white.png'
import TrashBlack from '../../../Assets/Icons/trash-black.png'
import ExpandLessWhite from '../../../Assets/Icons/expand-less-white.png'
import ExpandMoreWhite from '../../../Assets/Icons/expand-more-white.png'
import ExpandLessBlack from '../../../Assets/Icons/expand-less-black.png'
import ExpandMoreBlack from '../../../Assets/Icons/expand-more-black.png'
import Home from '../../../Assets/Icons/home.png'
import DownloadWhite from '../../../Assets/Icons/download-white.png'
import DownloadBlack from '../../../Assets/Icons/download-black.png'
import Folder from '../../../Assets/Icons/folder.png'
import EditWhite from '../../../Assets/Icons/edit-white.png'
import EditBlack from '../../../Assets/Icons/edit-black.png'
import Search from '../../../Assets/Icons/search.png'
import ArrowRightWhite from '../../../Assets/Icons/arrow_right_white.png'
import ArrowRightBlack from '../../../Assets/Icons/arrow-right-black.png'
import EasyReportWhite from '../../../Assets/Icons/easy-report-white.png'
import EasyReportBlack from '../../../Assets/Icons/easy-report-black.png'
import FolderWhite from '../../../Assets/Icons/folder_white.png'
import Apps from '../../../Assets/Icons/apps.png'
import Restore from '../../../Assets/Icons/restore.png'
import Settings from '../../../Assets/Icons/settings.png'
import Clients from '../../../Assets/Icons/clients.png'
import UserAcces from '../../../Assets/Icons/user-access.png'
import StarFilled from '../../../Assets/Icons/star_filled.png'
import StarBorder from '../../../Assets/Icons/star_border.png'
import LogoutWhite from '../../../Assets/Icons/logout_white.png'

class NavBtn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tooltipOpen: false
        }

        this.getImg = this.getImg.bind(this)
        this.getBtnClass = this.getBtnClass.bind(this)
        this.getImgClass = this.getImgClass.bind(this)
        this.toogleTooltip = this.toggleTooltip.bind(this)
    }

    getImg(name, white) {
        switch (name) {
            case 'AccessLog': return white ? AccessLogWhite : AccessLogBlack
            case 'ArrowBack': return ArrowBack
            case 'ArrowPrevFolder': return white ? ArrowPrevFolderWhite : ArrowPrevFolderBlack
            case 'ArrowNextFolder': return white ? ArrowNextFolderWhite : ArrowNextFolderBlack
            case 'ArrowForward': return white ? ArrowForwardBlack : ArrowForwardWhite
            case 'Apps': return Apps
            case 'Folder': return white ?  FolderWhite : Folder
            case 'Add': return white ? AddWhite : AddBlack
            case 'Home': return Home
            case 'NewClient': return NewClient
            case 'NewFolder': return white ? NewFolderWhite : NewFolderBlack
            case 'KebabHor': return KebabHor
            case 'KebabVert': return KebabVert
            case 'Upload': return white ? UploadWhite : UploadBlack
            case 'Trash': return white ? TrashWhite : TrashBlack
            case 'Download': return white ? DownloadWhite : DownloadBlack
            case 'Edit': return white? EditWhite : EditBlack
            case 'Search': return Search
            case 'ExpandMore': return white ? ExpandMoreWhite : ExpandMoreBlack
            case 'ExpandLess': return white ? ExpandLessWhite : ExpandLessBlack
            case 'ArrowRight': return white ? ArrowRightWhite : ArrowRightBlack
            case 'EasyReport': return white ?  EasyReportWhite : EasyReportBlack
            case 'Restore': return Restore
            case 'Settings': return Settings
            case 'Clients': return Clients
            case 'UserAccess': return UserAcces
            case 'StarFilled': return StarFilled
            case 'StarBorder': return StarBorder
            case 'Logout': return LogoutWhite
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

    toggleTooltip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    render() {
        return (
            <span>
                <button
                    className={this.getBtnClass(this.props.contextClass)}
                    id={this.props.contextId ? this.props.contextId : null}
                    onClick={this.props.action}
                    disabled={this.props.isDisabled}>

                    <img
                        className={this.getImgClass(this.props.contextClass)}
                        src={this.getImg(this.props.img, this.props.white)}
                        alt={this.props.descr} />

                    {this.props.children}

                    {this.props.showDescr ? (<p
                        className={"btn-descr"}>
                        {this.props.descr}
                    </p>) : null}
                </button>
{/* 
              {this.props.hasTooltip === true ? (
                    <BtnTooltip targetId={this.props.contextId} descr={this.props.descr} />
               ) : null} */}
            </span>
        )
    }
}

export default NavBtn