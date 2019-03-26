import React from 'react'
import PageNav from "../../../Shared/PageNav/PageNav";
import { setNav } from '../../../../Store/Actions/navActions'
import { connect } from "react-redux";

const FileNav = props => {

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
        if (props.is_recyclebin) {
            return `/client/${props.match.params.client_id}/files`
        }

        if (props.selected_folder.is_root) {
            return '/clients'
        }
    }

      /**
     * Get back link
     * @returns {*}
     */
    const getBackDescr = () => {
        if(props.is_recyclebin) {
            return 'Tilbake til kunde'
        }

        if(props.selected_folder.is_root) {
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
                props.toggleUploadModal()
            }
        },
        {
            btnKey: 1,
            contextId: "editor",
            img: "OpenEditor",
            imgDescr: "Tekstbehandling",
            btnAction: () => {
                props.toggleEditorModal()
            }
        },
        {
            btnKey: 2,
            contextId: "new-folder",
            img: "NewFolder",
            imgDescr: "Ny mappe",
            btnAction: () => {
                props.toggleNewFolderModal()
            }
        },
        {
            btnKey: 3,
            contextId: "trash",
            isLink: true,
            to: `/client/${props.match.params.client_id}/recyclebin`,
            img: "TrashWhite",
            imgDescr: "Søpplebøtte"
        },
        {
            btnKey: 4,
            contextId: "accesslog-client",
            isLink: true,
            to: `/accesslog/client/${props.match.params.client_id}`,
            img: "AccessLogWhite",
            imgDescr: "Adgangslogg"
        }
    ]

    //Define buttons to be visible in rec
    const menuListRec = []

    /**
     * Render PageNav
     */

     

    return <PageNav
        menuBtns={props.is_recyclebin ? menuListRec : menuList}
        hasCollapse={props.is_recyclebin ? false : true}

        backIsLink={props.selected_folder.is_root ? true : false}
        backTo={getBackLink()}
        backAction={upOneLevel}
        backDescr={getBackDescr()}

        searchValue={props.search}
        searchAction={props.updateSearch}
        searchPlaceholder="Søk etter filer"
    />
};

export default FileNav;