import React from 'react';
import {Document, Page, pdfjs} from 'react-pdf'
import {Button, Alert} from 'reactstrap'

import {withResizeDetector} from 'react-resize-detector';

class PDFDriver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num_pages: null,
            page_limit: 5
        }
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this)
        this.loadMorePages = this.loadMorePages.bind(this)
    }

    /**
     * Update num_pages on load
     * @param e
     */
    onDocumentLoadSuccess(e) {
        const num_pages = e._pdfInfo.numPages
        this.setState({num_pages});
    }

    /**
     * Add 5 more pages to page_limit, which causes 5 more pages to render
     */

    loadMorePages() {
        //Add 5+ to page limit, which increased the pages loaded.
        this.setState({...this.state, page_limit: this.state.page_limit + 5})
    }


    render() {
        //Set page limit on what comes first, amount of pages in document or page limit
        const page_limit = this.state.num_pages > this.state.page_limit ? this.state.page_limit : this.state.num_pages

        //View pages
        return <Document
            file={this.props.blob}
            onLoadSuccess={this.onDocumentLoadSuccess}
            loading=''>
            <p>{page_limit} av {this.state.num_pages} sider vises.</p>
            {
                /*List all pages in PDF document based limited on page_limit.*/
                <div>
                    {[...Array(page_limit)].map((e, i) => {
                        return (<div><Page key={i + '_pdf'} pageNumber={i + 1} width={this.props.width}/>
                            <p>Side {i + 1} av {this.state.num_pages}.</p></div>)
                    })}
                </div>
            }
            <p>
                {
                    /* Show load more button */
                    this.state.num_pages !== page_limit ? <Button onClick={this.loadMorePages}>Vis flere sider...</Button> :
                        <Alert color='primary'>Alle sider er lastet.</Alert>
                }
            </p>
        </Document>
    }

    componentDidMount() {
        //Fix for running in create-react-app
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }
}

/**
 * Export with resize detector to allow for width to be responsive
 */
export const PDFViewer = withResizeDetector(PDFDriver)

