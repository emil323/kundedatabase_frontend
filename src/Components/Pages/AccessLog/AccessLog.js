import React from 'react'
import { Component } from 'react'
import AccessLogData from './AccessLogData'
import "./AccessLog.css"
import { Container, Row, Col, Table, Alert, Spinner } from 'reactstrap';
import PageNav from '../../Shared/PageNav/PageNav'

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { setTrail } from '../../../Store/Actions/breadcrumbActions'
import { fetchAccessLogData, updateSearch } from '../../../Store/Actions/accesslogActions'
import { withRouter } from 'react-router-dom';


class AccessLog extends Component {


    constructor(props) {
        super(props)
        this.state = {
            type: 'all',
            id:null
        }
    }

    render() {

        const FILE = 'file'
        const CLIENT = 'client'
        const CONSULTANT = 'consultant'
        const IP = 'ip'
        

        let filteredAccessLog = this.props.accesslog.filter(log => {
            return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 ||
                log.file_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1

        })


        const buttonMenu = []

        let backDescr = 'Hjem'
        let backTo = '/'

        switch(this.state.type) {
            case FILE:
                backDescr = 'Tilbake til fil'
                backTo = `/file/${this.state.id}`
            break
            case CLIENT: 
                backDescr = 'Tilbake til kunde'
                backTo = `/client/${this.state.id}/files`
            break 
            case CONSULTANT: 
                backDescr = 'Tilbake til bruker'
                backTo = `/profile/${this.state.id}`
            break 
            case IP: 
                backDescr = 'Tilbake til adgangslogg'
                backTo = `/accesslog`
             break 
        }

        return (
            <Container fluid>
                <PageNav
                    backIsLink
                    backDescr={backDescr}
                    backTo={backTo}

                    searchValue={this.props.searchLog}
                    searchActtion={this.props.updateSearch.bind(this)}
                    searchPlaceholder="Søk i loggen"

                    buttons={buttonMenu} />
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
                                </tr>
                                : filteredAccessLog.map(log => {
                                    return <AccessLogData log={log} key={log.id} />
                                })

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
        const { id, type } = this.props.match.params 
        console.log(this.props.match.params)
        //Set default value for type and id
        
        //Set initial state
        this.setState({type, id})

        //Fetch data
        this.props.fetchAccessLogData(type,id)

        this.props.setTrail([{
            title: 'Hjem',
            path: '/'
        },
        {
            title: 'Adgangslogg',
            path: '/accesslog'
        }])

        //TODO: push to breadcrumb 
    }
}


// Calls on a accesslogReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        accesslog: state.accesslogReducer.accesslog,
        search: state.accesslogReducer.search,
        is_loading: state.accesslogReducer.is_loading
    }
}

// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccessLogData: (type,id) => { dispatch(fetchAccessLogData(type,id)) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        setTrail: (trail) => { dispatch(setTrail(trail)) }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessLog))




































