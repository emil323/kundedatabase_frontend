import React from 'react'
import word from "../../../Assets/Icons/word.png"
import pdf from "../../../Assets/Icons/pdf.png"
import excel from "../../../Assets/Icons/excel.png"
import textDoc from "../../../Assets/Icons/txt.png"

import { Component } from 'react'
import DropdownBtn from '../../DropdownBtn/DropdownBtn';

 class FilesTable extends Component {
     constructor(props){
         super(props);
         this.state = {
            btnOptions: [
                { tekst: 'Behandle', isHeader: 1, key: 1 },
                { tekst: 'Vis', isHeader: 0, key: 2 },
                { tekst: 'Slett', isHeader: 0, key: 3, function: () => { return props.deleteFile(props.file.id)}},
                { tekst: 'Test', isHeader: 1, key: 4 },
                { tekst: 'Placeholder', isHeader: 0, key: 5, },
            ]
         }
     }

    
    checkFileType = (type) => {
        switch(type){
            case "WORD":
                return word
            case "pdf":
                return pdf
            case "EXCEL":
                return excel
            default:
                return textDoc
        }
    }
        render(){
            return(
                <tbody>
                    <tr>
                        <td><img src={this.checkFileType(this.props.file.type)} alt="s"/></td>
                        <td>{this.props.file.type}</td>
                        <td>{this.props.file.name}</td>
                        <td>{this.props.file.last_changed}</td>
                        <td><DropdownBtn options={this.state.btnOptions} /></td>
                    </tr>
                </tbody>
            )
        }    
}


export default FilesTable