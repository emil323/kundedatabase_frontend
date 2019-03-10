import React from 'react'
import {Component} from 'react'
import {getDriver} from './DriverFinder'
import './FileViewer.css'

const FileViewer = (props) => {
    const Driver = getDriver(props.metadata.file_type)
    return <div className='file_viewer text-center mx-auto justify-content-center'><Driver {...props} /></div>
}

export default FileViewer