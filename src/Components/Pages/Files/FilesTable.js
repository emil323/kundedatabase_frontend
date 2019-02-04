import React from 'react'
import word from "../../../Assets/Icons/word.png"
import pdf from "../../../Assets/Icons/pdf.png"
import excel from "../../../Assets/Icons/excel.png"
import textDoc from "../../../Assets/Icons/txt.png"



 const FilesTable = ({files, deleteFile, checkFileType}) => {

    checkFileType = (type) => {
        switch(type){
            case "WORD":
                return word
            case "PDF":
                return pdf
            case "EXCEL":
                return excel
            default:
                return textDoc
        }
    }

        return(
            <tbody>
                <tr>
                    <td><img src={checkFileType(files.type)} alt="s"/></td>
                    <td>{files.type}</td>
                    <td>{files.tittel}</td>
                    <td>{files.sistendret}</td>
                    <td><button key={files.id} onClick={() => {deleteFile(files.id)}}>DEL</button></td>
                </tr>
            </tbody>
        )
}


export default FilesTable