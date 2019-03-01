import React from 'react';
import { Navbar, Input, Table, Form } from 'reactstrap';
import "./UserAccess.css"
import UserAccessData from "./UserAccessData"
import { authContext } from '../../../Auth/adalConfig'
import API from '../../../API/API';

import { connect } from "react-redux";
import { updateSearch, fetchUsersData } from '../../../Store/Actions/userActions'

class UserAccess extends React.Component {

    toggleCheckbox = () => {

    }

    render() {
        let filteredUsers = this.props.users.filter(user => {
            return user.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
                <Form class="customRadio">
                    <Navbar sticky="top">
                        <Input type="text" value={this.props.search} placeholder="Søk etter bruker" onChange={this.props.updateSearch.bind(this)} />
                    </Navbar>

                    <Table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Email</th>
                                <th>Fornavn</th>
                                <th>Etternavn</th>
                                <th>Har adgang</th>
                                <th>Administrator</th>
                                <th>Superadmin</th>
                            </tr>
                        </thead>
                        {
                            filteredUsers.map(user => {
                                return <UserAccessData user={user} key={user.id} />
                            })
                        }
                    </Table>
                </Form>
            </div>
        );
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API

    componentDidMount() {

        this.props.fetchUsersData()

        authContext.acquireToken('https://graph.microsoft.com', (message, token, msg) => {
            API.consultants().list(token)
                .then(res => console.log(res))
        })

    }
}



// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        search: state.usersReducer.search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersData: () => { dispatch(fetchUsersData()) },
        updateSearch: (search_key) => { dispatch(updateSearch(search_key)) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserAccess)