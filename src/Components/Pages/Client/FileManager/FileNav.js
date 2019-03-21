import React from 'react'
import PageNav from "../../../Shared/PageNav/PageNav";

const FileNav = props => {

    const upOneLevel = () => {
        if (!props.selected_folder.is_root) {
            props.is_recyclebin
                ? props.history.push('/client/' + props.match.params.client_id + "/recyclebin/" + props.selected_folder.parent_id)
                : props.history.push('/client/' + props.match.params.client_id + "/files/" + props.selected_folder.parent_id)
        }
    }

    /**
     * Get back link
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

    //Define buttons to be visible in filemanager
    const staticMenuList = []
    const collapseMenuList = [
        {
            btnKey: 0,
            img: "UploadFile",
            imgDescr: "Filopplasting",
            btnAction: () => {
                props.toggleUploadModal()
            }
        },
        {
            btnKey: 1,
            img: "OpenEditor",
            imgDescr: "Tekstbehandling",
            btnAction: () => {
                props.toggleEditorModal()
            }
        },
        {
            btnKey: 2,
            img: "NewFolder",
            imgDescr: "Ny mappe",
            btnAction: () => {
                props.toggleNewFolderModal()
            }
        },
        {
            btnKey: 3,
            isLink: true,
            to: `/client/${props.match.params.client_id}/recyclebin`,
            img: "TrashWhite",
            imgDescr: "Søpplebøtte"
        },
        {
            btnKey: 4,
            isLink: true,
            to: `/accesslog/client/${props.match.params.client_id}`,
            img: "AccessLogWhite",
            imgDescr: "Adgangslogg"
        }
    ]

    //Define buttons to be visible in rec
    const collapseMenuListRec = []

    /**
     * Render PageNav
     */

    return <PageNav
        staticMenuBtns={staticMenuList}
        collapseMenuBtns={props.is_recyclebin ? collapseMenuListRec : collapseMenuList}
        hasCollapse={props.is_recyclebin ? false : true}

        backIsLink={props.selected_folder.is_root ? true : false}
        backTo={getBackLink()}
        hasCollapseToggle={props.is_recyclebin ? false : true}
        backAction={upOneLevel}
        // backDescr={props.selected_folder.is_root ? "Tilbake til kunder" : "Tilbake et hakk"}

        searchValue={props.search}
        searchAction={props.updateSearch}
        searchPlaceholder="Søk etter filer"
    />
};

export default FileNav;