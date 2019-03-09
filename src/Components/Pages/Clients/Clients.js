import React from 'react'
import { Component } from 'react'
import ClientData from './ClientData'
import "./Clients.css"
import { Table } from 'reactstrap';
import { Container, Row, Col, ButtonGroup, Navbar, Alert, Input, Spinner } from 'reactstrap';
import { setTrail } from '../../../Store/Actions/breadcrumbActions'
import PageNav from '../../Shared/PageNav/PageNav'
// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteClient, fetchClientsData, updateSearch, toggleModal } from '../../../Store/Actions/clientsActions'
import AddClient from './AddClient';
import { IS_LOADING } from '../../../Store/types';

class Clients extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.clients)
        let filteredClients = this.props.clients.filter(client => {
            return client.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })

        const buttonMenu = [
            {
                btnKey: 0,
                img: "NewClient",
                imgDescr: "Ny kunde",
                btnAction: () => { this.props.toggleModal() }
            }
        ]

        return (
            <Container fluid>
                <PageNav
                    hasCollapseToggle="false"

                    backIsLink="true"
                    backDescr="Hjem"
                    backTo={'/'}

                    searchValue={this.props.search}
                    searchAction={this.props.updateSearch.bind(this)}
                    searchPlaceholder="Søk etter kunde"

                    buttons={buttonMenu}
                />

                <Row>
                    <Col>
                        <Table className="table table-hover">
                            <thead className="thead-dark">
                                {
                                    //Ser det finere ut uten?
                                    /*
                                    <tr>
                                        <th>Firmanavn</th>
                                        <th>Favoritt</th>
                                    </tr>
                                    */
                                }
                            </thead>
                            {
                                this.props.is_loading ?
                                    <tr>
                                        <td colspan="4">
                                            <Alert color="light">
                                                <p className="text-center">
                                                    <Spinner color="dark" />
                                                </p>
                                            </Alert>
                                        </td>
                                    </tr>
                                    : filteredClients.map(client => {
                                        return <ClientData client={client}
                                            fetchClientsData={this.props.fetchClientsData}
                                            key={client.id} />
                                    })
                            }
                        </Table>
                        <AddClient />

                    </Col>
                </Row>
            </Container>
        )
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        this.props.fetchClientsData()

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
        is_loading: state.clientsReducer.is_loading
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteClient: (id) => { dispatch(deleteClient(id)) },
        toggleModal: () => { dispatch(toggleModal()) },
        fetchClientsData: () => { dispatch(fetchClientsData()) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        setTrail: (trail) => { dispatch(setTrail(trail)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
