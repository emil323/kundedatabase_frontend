import React from 'react'
import {Component} from 'react'
import ClientData from './ClientData'
import AccessLog from '../../AccessLog/AccessLog'
import "./Clients.css"
import { Table } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteClient, fetchClientsData, fetchAccessLogData, updateSearch, updateLogSearch} from '../../../Store/Actions/clientActions'
import AddClient from './AddClient';

class Clients extends Component {
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "1"
        };
    }

    toggle(tab){
        if(this.state.activeTab !== tab){
            this.setState({
                activeTab: tab
            })
        }
    }

    render() {
        console.log(this.props.clients)
        let filteredClients = this.props.clients.filter(client => {
            return client.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })
        let filteredAccessLog = this.props.accesslog.filter(log => {
            return log.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
                <Nav tabs>

                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1'})}
                            onClick={() => { this.toggle('1'); }}
                        >
                        Klienter
                        </NavLink>
                    </NavItem>


                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                        Adgangslogg
                        </NavLink>
                    </NavItem>

                </Nav>


                <TabContent activeTab={this.state.activeTab}>

                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Table className="table table-hover">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Firmanavn</th>
                                            <th>#</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        filteredClients.map(client => {
                                            return  <ClientData client={client} deleteClient={this.props.deleteClient} key={client.id}/>
                                        })
                                    }
                                </Table>
                                <label>Søk etter kunde:</label>
                                <input type="text" value={this.props.search} onChange={this.props.updateSearch.bind(this.props.updateSearch)}/>
                                <AddClient buttonLabel={"Ny kunde"}  />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Table className="table table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Navn</th>
                                                <th>#</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        {
                                            filteredAccessLog.map(log => {
                                                return  <AccessLog log={log} key={log.id}/>
                                            })
                                        }
                                    </Table>
                                    <label>Søk etter endring:</label>
                                    <input type="text" value={this.props.search} onChange={this.props.updateSearch.bind(this)}/>
                            </Col>
                        </Row>
                    </TabPane>

                </TabContent>

            </div>
        )
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        this.props.fetchClientsData()
        this.props.fetchAccessLogData()
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients,
        accesslog: state.clientsReducer.accesslog,
        search: state.clientsReducer.search,
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteClient: (id) => { dispatch(deleteClient(id))},
        fetchClientsData: () =>{ dispatch(fetchClientsData())},
        fetchAccessLogData: () =>{ dispatch(fetchAccessLogData())},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))},}
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
