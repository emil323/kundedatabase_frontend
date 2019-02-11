import React from 'react';
import { Table, Form } from 'reactstrap';
import "./UserAccess.css"
import UserAccessData from "./UserAccessData"

import { connect } from "react-redux";
import { } from '../../../Store/Actions/userActions'

class UserAccess extends React.Component {

    toggleCheckbox = () => {
 
    }

    render() {
        return (
            <div className="container">
            <Form class="customRadio">
                <Table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Brukere</th>
                            <th>Har adgang:</th>
                            <th>Administrator:</th>
                        </tr>
                    </thead>
                    <UserAccessData />
            </Table>
            </Form>
            </div>
        );
  }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        this.props.()
        this.props.fetchAccessLogData()
    }
}



// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients,
        search: state.clientsReducer.search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserAccess)