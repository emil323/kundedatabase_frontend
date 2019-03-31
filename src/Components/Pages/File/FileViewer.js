import React from 'react'
import {Component} from 'react'
import {getDriver} from './DriverFinder'
import './FileViewer.css'

const FileViewer = (props) => {
    console.log('file_viewer',props)
    const Driver = getDriver(props.file)
    return props.file !== null
        ? <div className='file_viewer text-center mx-auto justify-content-center'><Driver {...props} /></div>
        : null
}

export default FileViewer