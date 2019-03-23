import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import { toggleAccesslogReportModal } from "../../../../Store/Actions/modalActions";
import {formatDate} from '../../../Helpers/Formatting/DateHelper'

import api from "../../../../API/API";

class ReportModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        is_loading: false,
        report : []
    }
  }

  render() {


    //Check if value if unique in selected directory

    return (
      <div className="container">
        <Modal
          centered
          isOpen={this.props.modal}
          toggle={this.props.toggleAccesslogReportModal}
          className={this.props.className}>
          <ModalHeader toggle={this.props.toggleAccesslogReportModal}>
           Forenklet rapport: {this.props.consultant_name}
          </ModalHeader>
          <ModalBody>
          <Table className="table table-hover">
                            
            <thead  className="thead-dark">
                <tr>
                    <th>Kunde</th>
                    <th>Først besøkt</th>
                    <th>Sist besøkt</th>
                </tr>
            </thead>
              {
                this.state.is_loading ?<tbody><tr>
                  <td Colspan="5">
                      <Alert color="light">
                          <p className="text-center">
                              <Spinner color="dark" />
                          </p>
                      </Alert>
                  </td>
              </tr> 
            </tbody>
            : this.state.report.length > 0 && this.state.report.map(e => 
              <tbody key={e.client_id}>
                <tr>
                    <td ><Link to={`/client/${e.client_id}/files`}>{e.client_name}</Link></td>
                    <td >{formatDate(e.first_visit)}</td>
                    <td >{formatDate(e.last_visit)}</td>
                </tr>
            </tbody>
            )
              }
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleAccesslogReportModal}>Lukk</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
/**
 * Fetch report
 * @param {*} nextProps 
 */

  componentWillReceiveProps(nextProps) {
    if(nextProps.modal) {
        this.setState({...this.state, is_loading:true})
        api.accesslog().simpleReport().consultant(nextProps.consultant_id).then(res => {
            console.log('SIMPLE REPORT',res)

            this.setState({...this.state, is_loading:false, report:res.data})
        })
    }
}

}


const mapStateToProps = state => {
   
  const {consultant, modal} = state.modalReducer.access_report
  console.log(consultant)
  return {
    consultant_id: consultant.consultant_id,
    consultant_name: consultant.name,
    modal
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    toggleAccesslogReportModal:() => {dispatch(toggleAccesslogReportModal())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportModal);
