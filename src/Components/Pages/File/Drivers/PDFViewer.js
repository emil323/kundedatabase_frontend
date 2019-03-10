
import React from 'react';
import {Document,Page,pdfjs} from 'react-pdf'

export class PDFViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num_pages: null
        }
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this)
    }

    /**
     * Update num_pages on load
     * @param e
     */
    onDocumentLoadSuccess(e){
        const num_pages = e._pdfInfo.numPages
        this.setState({ num_pages });
        console.log(this.state)
        console.log(num_pages)
    }

    render() {
        //Fix for running in create-react-app
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        //View pages
        return <Document
            file={this.props.blob}
            onLoadSuccess={this.onDocumentLoadSuccess}>
            {
               <div> {[...Array(this.state.num_pages)].map((e, i) => {
                return <Page key={i +'_pdf'} pageNumber={i+1}/>
               })}</div>
            }
        </Document>
    }
}