import React from 'react'
import {Component} from 'react'
import {getDriver} from './DriverFinder'
import './FileViewer.css'

const FileViewer = (props) => {
    console.log('file_viewer',props)
    const Driver = getDriver(props.metadata)
    return <div className='file_viewer text-center mx-auto justify-content-center'><Driver {...props} /></div>
}

export default FileViewer