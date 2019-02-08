import React from 'react';
import { Table, Form } from 'reactstrap';
import "./UserAccess.css"
import UserAccessData from "./UserAccessData"

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
}

export default UserAccess