import React, { Component } from 'react'
import './MenuBtn.css'

class MenuBtn extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div>
                <button className="btn-vector btn-menu" onClick={this.props.action}>
                <span className="btn-menu-text">{this.props.text}</span>
                    {/* <img src={ArrowForward} className="btn-vector-img btn-menu-img"/> */}
                </button>

            </div>
        )
    }
}

export default MenuBtn