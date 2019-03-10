
import {ImageViewer, PDFViewer, UnsupportedViewer,WordViewer} from "./Drivers";

export const getDriver = (mimetype) => {
    switch (mimetype) {
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