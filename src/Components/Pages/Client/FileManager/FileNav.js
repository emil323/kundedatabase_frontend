import React from 'react'
import PageNav from "../../../Shared/PageNav/PageNav";
import { setNav } from '../../../../Store/Actions/navActions'
import { connect } from "react-redux";

class FileNav extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return null 
    }

    componentWillReceiveProps(newProps) {

        const props = this.props 

        const upOneLevel = () => {
            if (!props.selected_folder.is_root) {
                props.is_recyclebin
                    ? props.history.push('/client/' + props.match.params.client_id + "/recyclebin/" + props.selected_folder.parent_id)
                    : props.history.push('/client/' + props.match.params.client_id + "/files/" + props.selected_folder.parent_id)
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
                img: "UploadFile",
                imgDescr: "Filopplasting",
                btnAction: () => {
                    newProps.toggleUploadModal()
                }
            },
            {
                btnKey: 1,
                contextId: "editor",
                img: "OpenEditor",
                imgDescr: "Tekstbehandling",
                btnAction: () => {
                    newProps.toggleEditorModal()
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
                img: "TrashWhite",
                imgDescr: "Søpplebøtte"
            },
            {
                btnKey: 4,
                contextId: "accesslog-client",
                isLink: true,
                to: `/accesslog/client/${newProps.match.params.client_id}`,
                img: "AccessLogWhite",
                imgDescr: "Adgangslogg"
            }
        ]
    
        //Define buttons to be visible in recyclebin ??
        const menuListRec = []
        if(props.selected_folder.id !== newProps.selected_folder.id) {
            props.setNav({
                menuBtns: newProps.is_recyclebin ? menuListRec : menuList,
                hasCollapse: newProps.is_recyclebin ? false : true,
                backIsLink: newProps.selected_folder.is_root ? true : false,
                backTo:getBackLink(),
                backAction:upOneLevel,
                backDescr: getBackDescr(),
                searchValue:props.search,
                searchAction:props.updateSearch,
                searchPlaceholder:"Søk etter filer"
            })
        }
    }
}



// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
	return {
		setNav:(options) => {dispatch(setNav(options))}
	}
}



export default connect(null, mapDispatchToProps)(FileNav)