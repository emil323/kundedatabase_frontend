import React from 'react';
import { Table, Form } from 'reactstrap';
import "./UserAccess.css"
import UserAccessData from "./UserAccessData"
import {authContext} from '../../../Auth/adalConfig'
import API from '../../../API/API';

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

  componentDidMount() {

    authContext.acquireToken('https://graph.microsoft.com',(message, token, msg) => {
        API.consultants().list(token)
            .then(res => console.log(res)) 
    })

  }
}

export default UserAccess