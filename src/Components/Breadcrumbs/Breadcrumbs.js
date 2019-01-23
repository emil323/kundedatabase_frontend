import React from 'react'
import { Breadcrumb, BreadcrumbItem}  from 'reactstrap'
import './Breadcrumbs.css'

export default class Breadcrumbs extends React.Component {
    render() {
        return (
            <div>
                <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" href="#">Placeholder</BreadcrumbItem>
                <BreadcrumbItem tag="span" active>Hjem</BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    }
}
