import React from 'react'
import {Component} from 'react'
import ClientData from './ClientData'
import AccessLog from '../../AccessLog/AccessLog'
import "./Clients.css"
import { Table } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import newBtnImg from '../../../img/new.png'
import {setTrail, pushTrail} from '../../../Store/Actions/breadcrumbActions'

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteClient, fetchClientsData, updateSearch, toggleModal} from '../../../Store/Actions/clientsActions'
import {fetchAccessLogData} from '../../../Store/Actions/accesslogActions'
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
            return log.client_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1

        })
        return (
            <div className="container">
                <Nav tabs>

                    <NavItem className="tabItem">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1'})}
                            onClick={() => { this.toggle('1'); }}
                        >
                        Kunder
                        </NavLink>
                    </NavItem>


                    <NavItem className="tabItem">
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
                            <input type="text" value={this.props.search} placeholder="Søk etter kunde..." onChange={this.props.updateSearch.bind(this)}/>
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
                                <Button className="modalBtn"  onClick={this.props.toggleModal}><img className="btnImg" src={newBtnImg}></img></Button>
                        
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <input type="text" value={this.props.searchLog} placeholder="Søk..." onChange={this.props.updateSearchLog.bind(this)}/>
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
                                                return  <AccessLog log={log} key={log.id}/>
                                            })
                                        }
                                    </Table>
                            </Col>
                        </Row>
                    </TabPane>

                </TabContent>
                <AddClient />
            </div>
        )
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        this.props.fetchClientsData()
        this.props.fetchAccessLogData()

        this.props.setTrail([{
            title: 'Hjem',
            path: '/'
         },
        {
            title: 'Kunder',
            path: '/clients'
        }])
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients,
        search: state.clientsReducer.search,
        accesslog: state.accesslogReducer.accesslog,
        searchLog: state.accesslogReducer.searchLog
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteClient: (id) => { dispatch(deleteClient(id))},
        toggleModal: () => { dispatch(toggleModal())},
        fetchClientsData: () =>{ dispatch(fetchClientsData())},
        fetchAccessLogData: () =>{ dispatch(fetchAccessLogData())},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))},
        updateSearchLog:(search_key) => {dispatch(updateSearch(search_key))},
        setTrail: (trail) => {dispatch(setTrail(trail))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
