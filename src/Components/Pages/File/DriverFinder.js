import {ImageViewer, PDFViewer, UnsupportedViewer, WordViewer, TooBigViewer} from "./Drivers";

//define max filesize for preview
const MAX_SIZE = 25000000

export const getDriver = ({file_type, size}) => {
    console.log('get_driver', file_type, size)
    if (size > MAX_SIZE) return TooBigViewer

    switch (file_type) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
        case 'image/bmp':
        case 'image/webp':
        case 'image/vnd.microsoft.icon':
            return ImageViewer
        case 'application/pdf':
            return PDFViewer
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return WordViewer
        default:
            return UnsupportedViewer
            break
    }
}

export const isSupported = (metadata) => {
    const class_name = getDriver(metadata).name
    return class_name === 'UnsupportedViewer' || class_name === 'TooBigViewer'
}

//Export
