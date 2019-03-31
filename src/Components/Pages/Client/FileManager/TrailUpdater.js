import {Component} from 'react'
import { connect } from "react-redux";

import {setTrail, pushTrail} from '../../../../Store/Actions/breadcrumbActions'

class TrailUpdater extends Component {

    constructor(props) {
        super(props)
        this.updateTrail = this.updateTrail.bind(this)
    }

    //This is supposed to be valid use
    render() {
       if(this.props.selected_folder.id !== '') this.updateTrail(this.props.selected_folder)
        return null
    }


    updateTrail(newFolder) {
        //Set inital trail for client
        this.props.setTrail([
            {
                title: this.props.client_name,
                path: '/client/' + this.props.client_id + '/files'
            }])

        //Check if newFolder is deleted, that means we are navigating recyclebin
        //We want a link to recyclebin in navigation
        if(newFolder.is_deleted) {
            this.props.pushTrail('Papirkurv', '/client/' + this.props.client_id + '/recyclebin')
        }

        //Push relations to breadcrumb trail, we use slice() because we don't want to modify our relations array
        newFolder.relations.slice().reverse().map(f => {
            if(!f.is_root)
                this.props.pushTrail(f.name, '/client/' + this.props.client_id + "/files/" + f.id)
        })

        if(this.props.selected_file) {
            this.props.pushTrail(this.props.selected_file.name)
        }
    }




}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return { 
        selected_folder : state.filesReducer.selected_folder,
        selected_file : state.filesReducer.selected_file,
        client_id : state.clientReducer.client_id,
        client_name : state.clientReducer.client_name 
     }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        setTrail: (trail) => {dispatch(setTrail(trail))},
        pushTrail: (title, path) => {dispatch(pushTrail(title, path))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailUpdater)