import React from 'react'
import { Component } from 'react'
import api from '../../../API/API'

import { setTrail, pushTrail } from '../../../Store/Actions/breadcrumbActions'

import { connect } from "react-redux";
import { Spinner } from 'reactstrap'
import FileViewer from './FileViewer'
import { isSupported } from './DriverFinder'
import { setNav } from '../../../Store/Actions/navActions'
import {isAdmin} from '../../Helpers/AdminChecker/AdminChecker'
import {fetchFilesDataByFileID, selectFile} from "../../../Store/Actions/filesActions";
import TrailUpdater from "../Client/FileManager/TrailUpdater";
import {toggleDeleteModal, toggleRenameModal} from "../../../Store/Actions/modalActions";
import DeleteModal from "../Client/FileManager/Modals/DeleteModal/DeleteModal";
import RenameModal from "../Client/FileManager/Modals/RenameModal/RenameModal";
import Alert from "reactstrap/es/Alert";
import ContentWrapper from "../../Shared/ContentWrapper/ContentWrapper";

class File extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blob: null,
            is_downloading: false,
            is_loading:true
        }
        this.download = this.download.bind(this)
        this.initFile = this.initFile.bind(this)
    }

    download() {
        //Download file from api
        if(this.state.blob) {
            const url = window.URL.createObjectURL(this.state.blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.props.selected_file.name);
            document.body.appendChild(link);
            link.click()
        } else {
            //Update state to is_downloading
            this.setState({ ...this.state, is_downloading: true })
            //Download file
            api.file(this.props.selected_file.id).download().then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.props.selected_file.name);
                document.body.appendChild(link);
                link.click()
                this.setState({...this.state, is_downloading: false})
            })
        }
    }

    Spinner = (props) => {
        return <p className='text-center'>
            <p><Spinner /></p>
            <h3>{props.text}</h3>
        </p>
    }


    render() {

        return (<ContentWrapper>
            {this.state.is_downloading && <Alert color='secondary'><this.Spinner text='Laster ned...' /></Alert>}
            { this.props.is_loading || this.state.is_loading
                    ? <this.Spinner  />
                    : <FileViewer blob={this.state.blob} file={this.props.selected_file} download={this.download} />
            }
            <DeleteModal/>
            <RenameModal/>
            <TrailUpdater/>
        </ContentWrapper>)
    }

    initFile() {
        //Add pagenav
        const menuList = [
            {
                btnKey: 0,
                contextId: "download-file",
                img: "Download",
                imgDescr: "Last ned",
                btnAction: this.download
            },
            {
                btnKey: 1,
                contextId: "download-file",
                img: "Trash",
                imgDescr: "Slett fil",
                btnAction: () => {this.props.toggleDeleteModal(this.props.selected_file)}
            },
            {
                btnKey: 2,
                contextId: "download-file",
                img: "Edit",
                imgDescr: "Endre fil",
                btnAction: () => {this.props.toggleRenameModal(this.props.selected_file)}
            }
        ]

        if(isAdmin) {
            menuList.push({
                btnKey: 1,
                contextId: "accesslog-file",
                img: "AccessLog",
                imgDescr: "Adgangslogg",
                btnAction: () => { this.props.history.push('/accesslog/file/' + this.props.selected_file.id) }
            })
        }

        this.props.setNav({
            disableSearch:true,
            backIsLink:true,
            hasCollapse:true,
            backTo:'/client/' + this.props.client_id + "/files/" + this.props.selected_folder.id,
            backDescr:"Tilbake til filer",
            alternativeMobileRightBtn:true,
            alternativeMobileRightDesc:'Last ned',
            alternativeMobileRightAction: this.download, 
            alternativeMobileRightImg:'Download',
            menuBtns:menuList
        })

        const can_preview = isSupported(this.props.selected_file)

        //Fetch file
        if (can_preview) {
            console.log('is supported', can_preview)
            api.file(this.props.selected_file.id).download().then(res => {
                if (!res.data.err) {
                    //Update state with new blob, set is_loading to false
                    this.setState({ ...this.state, is_loading: false, blob: new Blob([res.data]) })
                } else {
                    this.setState({ ...this.state, is_loading: false })
                    throw res.data.err
                }
            })
        } else {
            //Now supported
            console.log('not supported')
            this.setState({ ...this.state, is_loading: false })
        }
    }

    /**
     * This is used for when waiting for filesReducer to load, etc...
     * @param newProps
     */



    componentDidUpdate(prevProps) {
        if(prevProps.selected_file !== this.props.selected_file && this.props.client_id) { //The last to check if client is loaded
            this.initFile()
        }
    }

    /**
     * Used when file is not hard loaded
     */

    componentDidMount() {
        const { file_id } = this.props.match.params
        if(!this.props.selected_file)
            this.props.fetchFilesDataByFileID(file_id)
        else
            this.initFile()
        /*

        api.file(file_id).metadata().then(res => {
            console.log(res)
            this.setState({ ...this.state, metadata: res.data })

            //Update breadcrumbs
            this.props.setTrail([
                {
                    title: this.state.metadata.client_name,
                    path: '/client/' + this.state.metadata.client_id + "/files"
                }
            ])

            //Push trail to parent folder, if parent folder is not root
            if (!this.state.metadata.parent_is_root) {
                this.props.pushTrail(this.state.metadata.folder_name,
                    '/client/' + this.state.metadata.client_id + '/files/'
                    + this.state.metadata.folder_id)
            }
            //Add filename
            this.props.pushTrail(this.state.metadata.file_name, '/file/'
                + this.state.metadata.file_id)

            //Add pagenav
            const menuList = [
                {
                    btnKey: 0,
                    contextId: "download-file",
                    img: "Download",
                    imgDescr: "Last ned",
                    btnAction: this.download
                },
                
            ]

            if(isAdmin) {
                menuList.push({
                    btnKey: 1,
                    contextId: "accesslog-file",
                    img: "AccessLog",
                    imgDescr: "Adgangslogg",
                    btnAction: () => { this.props.history.push('/accesslog/file/' + this.state.metadata.file_id) }
                })
            }

            this.props.setNav({
                disableSearch:true, 
                backIsLink:true,
                
                backTo:'/client/' + this.state.metadata.client_id + "/files/" + this.state.metadata.folder_id,
                backDescr:"Tilbake til filer",
                menuBtns:menuList
            })
            
            const can_preview = isSupported(this.state.metadata)

            //Fetch file
            if (!can_preview) {
                console.log('is supported')
                api.file(this.state.metadata.file_id).download().then(res => {
                    if (!res.data.err) {
                        //Update state with new blob, set is_loading to false
                        this.setState({ ...this.state, is_loading: false, blob: new Blob([res.data]) })
                    } else {
                        this.setState({ ...this.state, is_loading: false })
                        throw res.data.err
                    }
                })
            } else {
                //Now supported
                console.log('not supported')
                this.setState({ ...this.state, is_loading: false })
            }
        })
    */
    }

}

const mapStateToProps = (state) => {

    const { root_folder, selected_folder, selected_file, is_loading } = state.filesReducer
    const { client_id, client_name } = state.clientReducer

    return {
        client_id,
        client_name,
        root_folder,
        selected_file,
        selected_folder,
        is_loading
    }
}


// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        setTrail: (trail) => {
            dispatch(setTrail(trail))
        },
        pushTrail: (title, path) => {
            dispatch(pushTrail(title, path))
        },
        setNav:(options) => {dispatch(setNav(options))},
        fetchFilesDataByFileID: (file_id) => {dispatch(fetchFilesDataByFileID(file_id))},
        selectFile:(file_id) => {dispatch(selectFile(file_id))},
        toggleDeleteModal: (file) => { dispatch(toggleDeleteModal(file)) },
        toggleRenameModal: (file) => { dispatch(toggleRenameModal(file)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(File)