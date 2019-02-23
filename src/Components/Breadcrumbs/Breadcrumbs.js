import React from 'react'
import { Breadcrumb, BreadcrumbItem}  from 'reactstrap'
import { connect } from "react-redux"
import './Breadcrumbs.css'

class Breadcrumbs extends React.Component {

    render() {
        console.log(this.props.trail)
        return (
            <div className={this.props.className}>
                <Breadcrumb tag="nav" listTag="div">
                    {
                        this.props.trail.map((crumb,i,trail) => {
                            return trail.length-1 !== i //Tenary operation on if the item is the last in map or not
                            ?<BreadcrumbItem tag="a" href={crumb.path}>{crumb.title}</BreadcrumbItem>
                            :<BreadcrumbItem tag="a" href={crumb.path} active>{crumb.title}</BreadcrumbItem>
                        })
                    }
                </Breadcrumb>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs)
