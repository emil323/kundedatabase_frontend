import {ImageViewer, PDFViewer, UnsupportedViewer, WordViewer, TooBigViewer} from "./Drivers";
import {MAX_FILE_PREVIEW_SIZE} from "../../../Settings"


export const getDriver = ({type, size}) => {
    if (size > MAX_FILE_PREVIEW_SIZE) return TooBigViewer
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
    }
}

export const isSupported = (metadata) => {
    const type = getDriver(metadata).prototype
    return type !== UnsupportedViewer.prototype && type !== TooBigViewer.prototype
}

//Export
