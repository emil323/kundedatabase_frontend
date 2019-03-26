import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import './Breadcrumbs.css'

class Breadcrumbs extends React.Component {

    constructor(props) {
        super(props)
        this.open = this.open.bind(this)
    }

    open(e, path) {
        e.preventDefault()
        this.props.history.push(path)
    }

    render() {
        console.log(this.props.trail)
        return (
            <Breadcrumb className={this.props.className}>
                    {
                    this.props.trail.map((crumb, i, trail) => {
                        return trail.length - 1 !== i //Tenary operation on if the item is the last in map or not
                            ? <BreadcrumbItem tag="a" href="" onClick={(e) => this.open(e, crumb.path)} active>{crumb.title}</BreadcrumbItem>
                            : <BreadcrumbItem tag="a" href="" onClick={(e) => this.open(e, crumb.path)}>{crumb.title}</BreadcrumbItem>
                    })
                }
            </Breadcrumb>
        )
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const { trail } = state.breadcrumbReducer
    return { trail }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs))
