
import React from 'react';

export const ImageViewer = (props) => {
    const img = URL.createObjectURL(props.blob)
    return <img src={img}/>
}