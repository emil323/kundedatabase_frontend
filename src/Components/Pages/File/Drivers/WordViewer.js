import React from 'react';
import Mammoth  from 'mammoth'
import SanitizedHTML from 'react-sanitized-html';

export class WordViewer extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            html: null
        }
    }

    /**
     * Render word document as html
     * @returns {XML}
     */
    render() {
        return <SanitizedHTML html={this.state.html} />
    }

    /**
     * Convert Blob to arraybuffer and then use Mammoth to convert word doc to arraybuffer
     * Update state content to html
     */

    componentDidMount() {
        //Create reader
        let reader = new FileReader()
        //Create event listener for when loading is complete
        reader.addEventListener('loadend', function() {
            //Convert document to html
            Mammoth.convertToHtml({arrayBuffer:reader.result}).then(res => {
                this.setState({html: res.value})
            }).bind(this) //Unsure about this binding, has to be a better way...
        }.bind(this))
        //Start reading process
        reader.readAsArrayBuffer(this.props.blob)
    }
}

