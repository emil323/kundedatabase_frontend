import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import PageNav from '../../Shared/PageNav/PageNav'
import {setTrail, pushTrail} from '../../../Store/Actions/breadcrumbActions'

import {connect} from "react-redux";
import {Spinner} from 'reactstrap'
import FileViewer from './FileViewer'
import {isSupported} from './DriverFinder'


class File extends Component {
    constructor(props) {
        super(props)
        this.state = {
            metadata: {
                client_id: '',
                client_name: '',
                file_id: '',
                file_name: '',
                file_type: '',
                size:0,
                folder_id: '',
                folder_name: '',
                parent_is_root: ''
            },
            blob: null,
            is_loading: true,
            is_downloading: false
        }
        this.download = this.download.bind(this)
    }

    download() {
        //Update state to is_downloading
        this.setState({...this.state, is_downloading:true})
        //Download file from api
        api.file(this.state.metadata.file_id).download().then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.state.metadata.file_name);
            document.body.appendChild(link);
            link.click()
            this.setState({...this.state, is_downloading:false})
        })
    }

    Spinner = (props) => {
        return <p className='text-center'>
            <p><Spinner /></p>
            <h3>{props.text}</h3>
        </p>
    }

    render() {
        const nav_buttons = [{
                btnKey: 0,
                img: "Download",
                imgDescr: "Last ned",
                btnAction: this.download
            }]


        return (<div>
            <PageNav
                backIsLink={false}
                backAction={() => {
                    this.props.history.push('/client/' + this.state.metadata.client_id + "/files/" + this.state.metadata.folder_id)
                }}
                buttons={nav_buttons}/>
            {this.state.is_downloading
                ? <this.Spinner text='Laster ned...'/>
                : this.state.is_loading
                    ? <this.Spinner text='Vent litt..'/>
                    : <FileViewer blob={this.state.blob} metadata={this.state.metadata} download={this.download}/>
            }
        </div>)
    }


    componentDidMount() {
        const {file_id} = this.props.match.params

        api.file(file_id).metadata().then(res => {
            console.log(res)
            this.setState({...this.state,  metadata: res.data})

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


            const can_preview = isSupported(this.state.metadata)

            //TODO: Create a check for max filesize here, we don't want to preview a 5gb large file

            //Fetch file
            if(!can_preview ) {
                console.log('is supported')
                api.file(this.state.metadata.file_id).download().then(res => {
                    if (!res.data.err) {
                        //Update state with new blob, set is_loading to false
                        this.setState({...this.state, is_loading: false, blob: new Blob([res.data])})
                    } else {
                        this.setState({...this.state, is_loading: false})
                        throw res.data.err
                    }
                })
            } else {
                //Now supported
                console.log('not supported')
                this.setState({...this.state, is_loading: false})
            }
        })

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
        }
    }
}

export default connect(null, mapDispatchToProps)(File)