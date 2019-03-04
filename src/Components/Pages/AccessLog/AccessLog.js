import React from 'react'
import { Component } from 'react'
import AccessLogData from './AccessLogData'
import "./AccessLog.css"
import { Navbar, Input, Table, Alert, Spinner} from 'reactstrap';

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { setTrail } from '../../../Store/Actions/breadcrumbActions'
import { fetchAccessLogData, updateSearch } from '../../../Store/Actions/accesslogActions'
import { withRouter } from 'react-router-dom';

class AccessLog extends Component {

    render() {
        console.log(this.props)
        console.log(this.props.location.pathname)
        let filteredAccessLog = this.props.accesslog.filter(log => {
            return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 ||
            log.file_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1

        })
        /*
        let clientFilteredAccessLog = this.props.accesslog.filter(log => {
            if (log.client_id === this.props.match.params.client_id) {
                return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
            }
        })
        */

        return (
            <div className="container">
                <Navbar sticky="top">
                    <Input type="text" value={this.props.searchLog} placeholder="Søk" onChange={this.props.updateSearch.bind(this)} />
                </Navbar>
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
                                       <Spinner color="dark"/>
                              </p>
                                </Alert>
                            </td>
                        </tr>
                        : filteredAccessLog.map(log => {
                                return  <AccessLogData log={log} key={log.id}/>
                        })

                    }
                    {/*
                        clientFilteredAccessLog.map(log => {
                            return <AccessLogData log={log} key={log.id} />
                        })
                    */
                    }
                </Table>
            </div>
        )
    }

    //Calls fetchAccessLogData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        const {client_id} = this.props.match.params //Client ID can be undefined, api allows this
        this.props.fetchAccessLogData(client_id)
        
        this.props.setTrail([{
            title: 'Hjem',
            path: '/'
        }, 
        {
            title: 'Adgangslogg',
            path: '/accesslog'
        }])
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
        fetchAccessLogData: (client_id) =>{ dispatch(fetchAccessLogData(client_id))},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))},
        setTrail:(trail) => {dispatch(setTrail(trail))}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessLog))




































