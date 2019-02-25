import React from 'react'
import {Component} from 'react'
import ClientAccessLogData from './ClientAccessLogData'
import "./AccessLog.css"
import { Table } from 'reactstrap';

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import {fetchAccessLogData, updateSearch} from '../../../Store/Actions/accesslogActions'

class ClientAccessLog extends Component {

    render() {
        console.log(this.props.clients)
        let filteredAccessLog = this.props.accesslog.filter(log => {
            if(log.client_id === this.props.match.params.client_id){
                return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
            }
        })
        return (
            <div className="container">
            <input type="text" value={this.props.searchLog} placeholder="Søk..." onChange={this.props.updateSearch.bind(this)}/>
                <Table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Kunde</th>
                            <th>Besøkt</th>
                            <th>Navn</th>
                            <th>IP</th>
                            <th>Sist besøkt</th>
                        </tr>
                    </thead>
                    {
                        filteredAccessLog.map(log => {
                         
                            return  <ClientAccessLogData log={log} key={log.id}/>
                        })
                    }
                    </Table>
            </div>
        )
    }

    //Calls fetchAccessLogData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        this.props.fetchAccessLogData()
    }
}


// Calls on a accesslogReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        accesslog: state.accesslogReducer.accesslog,
        search: state.accesslogReducer.search
    }
}

// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccessLogData: () =>{ dispatch(fetchAccessLogData())},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientAccessLog)


































                

            