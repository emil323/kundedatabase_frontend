import React from 'react'
import { Component } from 'react'
import AccessLogData from './AccessLogData'
import "./AccessLog.css"
import { Container, Row, Col, Table, Alert, Spinner } from 'reactstrap';


// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { setTrail, pushTrail } from '../../../Store/Actions/breadcrumbActions'
import { fetchAccessLogData, updateSearch } from '../../../Store/Actions/accesslogActions'
import {toggleAccesslogReportModal} from '../../../Store/Actions/modalActions'
import { setNav } from '../../../Store/Actions/navActions'
import { withRouter } from 'react-router-dom';
import API from '../../../API/API';
import ReportModal from './ReportModal/ReportModal';


class AccessLog extends Component {


    constructor(props) {
        super(props)
        this.state = {
            type: 'all',
            id: null,
            is_exporting: false,
        }
        this.csv_export = this.csv_export.bind(this)
    }

    render() {
        let filteredAccessLog = this.props.accesslog.filter(log => {
            return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 ||
                log.file_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1

        })


        return (
            <Container fluid>
                <Row>
                    <Col sm="12" xs="12" md="12" lg={{ size: '12' }} xl={{ size: '10', offset: 1 }}>
                        {
                            this.state.is_exporting
                                ? <tr>
                                    <td Colspan="5">
                                        <Alert color="secondary">
                                            <p className="text-center">
                                                <Spinner color="dark" /><p>Genererer eksport, dette kan ta litt tid...</p>
                                            </p>
                                        </Alert>
                                    </td>
                                </tr>
                                : ''
                        }
                        <Table id="accesslogTable" className="table table-hover">

                            <thead id="accesslogThead" className="thead-dark">
                                <tr>
                                    <th>Kunde</th>
                                    <th>Besøkt</th>
                                    <th>Navn</th>
                                    <th>IP</th>
                                    <th>Sist besøkt</th>
                                </tr>
                            </thead>

                            {this.props.is_loading ?
                                <tr>
                                    <td Colspan="5">
                                        <Alert color="light">
                                            <p className="text-center">
                                                <Spinner color="dark" />
                                            </p>
                                        </Alert>
                                    </td>
                                </tr> :
                                filteredAccessLog.length > 0 ? filteredAccessLog.map(log => {
                                    return <AccessLogData log={log} key={log.id} />
                                })
                                    : <tr>
                                        <td Colspan="5">
                                            <Alert color="light">
                                                <p className="text-center">
                                                    Her er det tomt.
                                        </p>
                                            </Alert>
                                        </td>
                                    </tr>

                            }

                        </Table>
                        {filteredAccessLog.length >= 500 && !this.props.is_loading ?
                            <Alert color="secondary">Maksimalt 500 rader blir lastet, dersom du ønsker å se mer så må du kjøre en eksport.
                        </Alert> : ''}
                    </Col>
                </Row>
                <ReportModal/>
            </Container>
         
        )
    }

    //Calls fetchAccessLogData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        console.log('mount')
        const { id, type } = this.props.match.params
        //Set initial state
        this.setState({ ...this.state, type, id })
        //Fetch data
        this.props.fetchAccessLogData(type, id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match !== nextProps.match) {
            this.props.fetchAccessLogData(nextProps.match.params.type, nextProps.match.params.id)
        } else if (nextProps.accesslog.length > 0) {

            const FILE = 'file'
            const CLIENT = 'client'
            const CONSULTANT = 'consultant'
            const IP = 'ip'


            //Set default value for type and id

            let backDescr = 'Tilbake til adgangslogg'
            let backTo = '/'
            let menuList = [{
                btnKey: 0,
                contextId: "download",
                btnAction: this.csv_export,
                to: `/file/${nextProps.file_id}`,
                img: "Download",
                imgDescr: "Exporter som CSV dokument"
            }]

            nextProps.setTrail([{
                title: 'Hjem',
                path: '/'
            },
            {
                title: 'Adgangslogg',
                path: '/accesslog'
            }])

            
            switch (nextProps.match.params.type) {
                case FILE: 
                    nextProps.pushTrail(nextProps.client_name, `/accesslog/client/${nextProps.client_id}`)
                    nextProps.access_type === 'VIEW_FILE'
                        ? nextProps.pushTrail(nextProps.file_name)
                        : nextProps.pushTrail('Strukturert data')

                        
                    menuList.push(
                        {
                            btnKey: 1,
                            isLink: true,
                            contextId: "goto-folder",
                            to: `/client/${nextProps.client_id}/files/${nextProps.parent_id}`,
                            img: "Folder",
                            imgDescr: "Gå til mappe"
                        },
                        {
                            btnKey: 2,
                            contextId: "goto-file",
                            isLink: true,
                            to: `/file/${nextProps.file_id}`,
                            img: "ArrowRight",
                            imgDescr: "Gå til fil"
                        })
                    break
                case CLIENT:
                    nextProps.pushTrail(nextProps.client_name)
                    menuList.push({
                        btnKey: 1,
                        isLink: true,
                        contextId: "goto-client",
                        to: `/client/${nextProps.client_id}/files`,
                        img: "ArrowRight",
                        imgDescr: "Gå til kunde"
                    })
                    break
                case CONSULTANT:
                    nextProps.pushTrail(nextProps.consultant_name)
                    menuList.push({
                        btnKey: 1,
                        contextId: "light-report",
                        img: "EasyReport",
                        imgDescr: "Forenklet rapport",
                        btnAction: () => {nextProps.toggleAccesslogReportModal({
                            consultant_id: nextProps.consultant_id, 
                            name: nextProps.consultant_name})}
                    })
                    break
                case IP:
                    nextProps.pushTrail(nextProps.ip)
                    break
                default:
                    backDescr = 'Hjem'
                    backTo = '/'
                    break;
            }

            this.props.setNav({
                hasCollapse:true,
                backIsLink:true,
                backDescr:backDescr,
                backTo:backTo,
                searchPlaceholder:"Søk i loggen",
                menuBtns:menuList 
            })

        }
    }
    /*
        Request a comma separated values from api, and download
    */
    csv_export() {
        this.setState({ ...this.state, is_exporting: true })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0;

        API.accesslog().export().filter(this.state.type).id(this.state.id).then(res => {

            let element = document.createElement('a')
            element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(res.data))
            element.setAttribute('download', `adgangslogg.${Date.now()}.csv`)
            element.style.display = 'none'
            document.body.appendChild(element)

            element.click()
            document.body.removeChild(element)

            this.setState({ ...this.state, is_exporting: false })
        })
    }

}




// Calls on a accesslogReducer that bring props to the component
const mapStateToProps = (state) => {
    const { accesslog } = state.accesslogReducer
    console.log('accesslog', accesslog)
    /**
     * Set header names 
     */

    let ip
    let client_name
    let consultant_name
    let file_name
    let file_id
    let consultant_id
    let client_id
    let access_type
    let parent_id


    if(accesslog.length > 0 ) {
        const first = accesslog[0]
        ip = first.ip
        client_name = first.client_name
        file_name = first.file_name
        consultant_name = first.first_name + ' ' + first.last_name
        file_id = first.file_id
        consultant_id = first.consultant_id
        client_id = first.client_id
        access_type = first.type
        parent_id = first.parent_id
    }

    return {
        accesslog,
        search: state.navReducer.search,
        is_loading: state.accesslogReducer.is_loading,
        ip, client_name, consultant_name, file_name, file_id, consultant_id, client_id, access_type, parent_id
    }
}

// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccessLogData: (type,id) => { dispatch(fetchAccessLogData(type,id)) },
        toggleAccesslogReportModal: (consultant) => {dispatch(toggleAccesslogReportModal(consultant))},
        setTrail: (trail) => { dispatch(setTrail(trail)) },
        pushTrail: (title, path) => { dispatch(pushTrail(title, path)) },
        setNav:(options) => {dispatch(setNav(options))}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessLog))



































