
import React from 'react';

export const ImageViewer = (props) => {
    console.log(props)
    const img = URL.createObjectURL(props.blob)
    return <img src={img} alt={img} />
}