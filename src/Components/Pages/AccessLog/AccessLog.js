import React from 'react'
import { Component } from 'react'
import AccessLogData from './AccessLogData'
import "./AccessLog.css"
import { Container, Row, Col, Table, Alert, Spinner } from 'reactstrap';
import PageNav from '../../Shared/PageNav/PageNav'

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { setTrail, pushTrail } from '../../../Store/Actions/breadcrumbActions'
import { fetchAccessLogData, updateSearch } from '../../../Store/Actions/accesslogActions'
import { withRouter } from 'react-router-dom';
import { access } from 'fs';


class AccessLog extends Component {


    constructor(props) {
        super(props)
        this.state = {
            type: 'all',
            id:null,
            backTo:'',
            backDescr:''
        }
    }

    render() {
        let filteredAccessLog = this.props.accesslog.filter(log => {
            return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 ||
                log.file_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1

        })


        return (
            <Container fluid>
                <PageNav
                    backIsLink
                    backDescr={this.state.backDescr}
                    backTo={this.state.backTo}
                    searchValue={this.props.searchLog}
                    searchActtion={this.props.updateSearch.bind(this)}
                    searchPlaceholder="Søk i loggen"
                    buttons={[]} />
                <Row>

                    <Col sm="12" xs="12" md="12" lg={{ size: '12'}} xl={{ size: '10', offset: 1 }}>
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
                               filteredAccessLog.length > 0  ? filteredAccessLog.map(log => {
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
                            {/*
                        clientFilteredAccessLog.map(log => {
                            return <AccessLogData log={log} key={log.id} />
                        })
                    */
                            }
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }

    //Calls fetchAccessLogData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        console.log('mount')
        const { id, type } = this.props.match.params 
        //Set initial state
        this.setState({ ...this.state, type, id})
        //Fetch data
        this.props.fetchAccessLogData(type,id)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match !== nextProps.match) {
            this.props.fetchAccessLogData(nextProps.match.params.type,nextProps.match.params.id)
        } else if(nextProps.accesslog.length > 0) {

            const FILE = 'file'
            const CLIENT = 'client'
            const CONSULTANT = 'consultant'
            const IP = 'ip'
    
            
            //Set default value for type and id
            
            let backDescr = 'Hjem'
            let backTo = '/'
    
            nextProps.setTrail([{
                title: 'Hjem',
                path: '/'
            },
            {
                title: 'Adgangslogg',
                path: '/accesslog'
            }])
    
            switch(nextProps.match.params.type) {
                case FILE:
                    backDescr = 'Tilbake til fil'
                    backTo = `/file/${nextProps.file_id}`
                    nextProps.pushTrail(nextProps.file_name, backTo)
                break
                case CLIENT: 
                    backDescr = 'Tilbake til kunde'
                    backTo = `/client/${nextProps.client_id}/files`
                    nextProps.pushTrail(nextProps.client_name, backTo)
                break 
                case CONSULTANT: 
                    backDescr = 'Tilbake til adgangslogg'
                    backTo = `/accesslog`
                    nextProps.pushTrail(nextProps.consultant_name, backTo)
                break 
                case IP: 
                    backDescr = 'Tilbake til adgangslogg'
                    backTo = `/accesslog`
                    nextProps.pushTrail(nextProps.ip, backTo)
                 break 
            }
    
            this.setState({...this.state,backDescr, backTo})
        }
    }

}




// Calls on a accesslogReducer that bring props to the component
const mapStateToProps = (state) => {
    const {accesslog} = state.accesslogReducer 
    console.log('accesslog',accesslog)
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

    if(accesslog.length > 0 ) {
        const first = accesslog[0]
        ip = first.ip
        client_name = first.client_name
        file_name = first.file_name
        consultant_name = first.first_name + ' ' + first.last_name 
        file_id = first.file_id 
        consultant_id = first.consultant_id
        client_id = first.client_id
    }

    return {
        accesslog,
        search: state.accesslogReducer.search,
        is_loading: state.accesslogReducer.is_loading,
        ip,client_name, consultant_name, file_name, file_id, consultant_id, client_id
    }
}

// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccessLogData: (type,id) => { dispatch(fetchAccessLogData(type,id)) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        setTrail: (trail) => { dispatch(setTrail(trail)) },
        pushTrail: (title, path) => {dispatch(pushTrail(title, path))}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessLog))




































