import React from 'react'
import {Component} from 'react'
import {getDriver} from './DriverFinder'

const FileViewer = (props) => {
    const Driver = getDriver(props.metadata.file_type)
    return <Driver {...props} />
}

export default FileViewer