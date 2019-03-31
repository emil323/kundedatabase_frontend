import React from 'react'
import PageNav from "../../../Navigation/PageNav/PageNav";
import { setNav, updateSearch } from '../../../../Store/Actions/navActions'
import { connect } from "react-redux";
import {isAdmin} from '../../../Helpers/AdminChecker/AdminChecker'

class FileNav extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return null 
    }

    comp

    componentWillReceiveProps(newProps) {

        const props = this.props 

        const upOneLevel = () => {
            if (!newProps.selected_folder.is_root) {
                newProps.is_recyclebin
                    ? newProps.history.push('/client/' + newProps.match.params.client_id + "/recyclebin/" + newProps.selected_folder.parent_id)
                    : newProps.history.push('/client/' + newProps.match.params.client_id + "/files/" + newProps.selected_folder.parent_id)
            }
        }
    
        /**
         * Get back description
         * @returns {*}
         */
        const getBackLink = () => {
            if (newProps.is_recyclebin) {
                return `/client/${newProps.match.params.client_id}/files`
            }
    
            if (newProps.selected_folder.is_root) {
                return '/clients'
            }
        }
    
          /**
         * Get back link
         * @returns {*}
         */
        const getBackDescr = () => {
            if(newProps.is_recyclebin) {
                return 'Tilbake til kunde'
            }
    
            if(newProps.selected_folder.is_root) {
                return 'Tilbake til kunder'
            } else {
                return 'Tilbake ett hakk'
            }
        }
    
    
        //Define buttons to be visible in filemanager
        const menuList = [
            {
                btnKey: 0,
                contextId: "upload",
                img: "Upload",
                imgDescr: "Filopplasting",
                btnAction: () => {
                    newProps.toggleUploadModal()
                }
            },
            {
                btnKey: 2,
                contextId: "new-folder",
                img: "NewFolder",
                imgDescr: "Ny mappe",
                btnAction: () => {
                    newProps.toggleNewFolderModal()
                }
            },
            {
                btnKey: 3,
                contextId: "trash",
                isLink: true,
                to: `/client/${newProps.match.params.client_id}/recyclebin`,
                img: "Trash",
                imgDescr: "Søpplebøtte"
            }
        ]

        if(isAdmin) {
            menuList.push({
                btnKey: 4,
                contextId: "accesslog-client",
                isLink: true,
                to: `/accesslog/client/${newProps.match.params.client_id}`,
                img: "AccessLog",
                imgDescr: "Adgangslogg"
            })
        }
    
        //Define buttons to be visible in recyclebin ??
        const menuListRec = [{
            btnKey: 3,
            contextId: "trash",
            isLink: true,
            to: `/client/${newProps.match.params.client_id}/files`,
            img: "ArrowPrevFolder",
            imgDescr: "Gå ut av papirkurv"
        }]
        if(props.selected_folder.id !== newProps.selected_folder.id || props.match.params !== newProps.match.params) {
            props.setNav({
                menuBtns: newProps.is_recyclebin ? menuListRec : menuList,
                hasCollapse: true,
                backIsLink: newProps.selected_folder.is_root ? true : false,
                backTo:getBackLink(),
                backAction:upOneLevel,
                backDescr: getBackDescr(),
                searchPlaceholder:"Søk etter filer"
            })
        }
    }


}





// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
	return {
        setNav:(options) => {dispatch(setNav(options))},
        updateSearch:(key) => {dispatch(updateSearch(key))}
	}
}



export default connect(null, mapDispatchToProps)(FileNav)