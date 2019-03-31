import {ImageViewer, PDFViewer, UnsupportedViewer, WordViewer, TooBigViewer} from "./Drivers";

//define max filesize for preview
const MAX_SIZE = 25000000

export const getDriver = ({type, size}) => {
    console.log('get_driver', type, size)
    if (size > MAX_SIZE) return TooBigViewer

    switch (type) {
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
    console.log(class_name)
    return class_name !== 'UnsupportedViewer' && class_name !== 'TooBigViewer'
}

//Export
