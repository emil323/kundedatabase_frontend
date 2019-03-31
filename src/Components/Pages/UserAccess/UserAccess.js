import React from 'react';
import { Container, Row, Col, Table, Form } from 'reactstrap';
import "./UserAccess.css"
import UserAccessData from "./UserAccessData"
import { authContext } from '../../../API/Auth/adalConfig'
import API from '../../../API/API';
import PageNav from '../../Navigation/PageNav/PageNav'

import { connect } from "react-redux";
import { updateSearch, fetchUsersData } from '../../../Store/Actions/userActions'
import { setTrail } from '../../../Store/Actions/breadcrumbActions'
import { setNav } from '../../../Store/Actions/navActions'

class UserAccess extends React.Component {


    render() {
        let filteredUsers = this.props.users.filter(user => {
            return user.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
                || user.email.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })

        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col sm="12" xs="12" md="12" lg={{ size: '12' }} xl={{ size: '10', offset: 1 }}>
                            <Form class="customRadio">
                                <Table className="table table-hover">
                                    {
                                        filteredUsers.map(user => {
                                            return <UserAccessData user={user} key={user.id} />
                                        })
                                    }
                                </Table>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div >

        );
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API

    componentDidMount() {
        this.props.setTrail([
            {
                title: 'Hjem',
                path: '/'
            },
            {
                title: 'Brukere'
            }
        ])
        this.props.setNav({
            backIsLink:true,
            backTo:"/",
            backDescr:"Hjem",
            searchValue:this.props.search,
            searchAction:this.props.updateSearch.bind(this),
            searchPlaceholder:"Søk etter bruker",
            menuBtns:[]
        })
        this.props.fetchUsersData()
    }
}



// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        search: state.navReducer.search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersData: () => { dispatch(fetchUsersData()) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) },
        setTrail: (trail) => { dispatch(setTrail(trail)) },
        setNav:(options) => {dispatch(setNav(options))}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserAccess)