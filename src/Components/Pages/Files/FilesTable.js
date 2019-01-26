import React from 'react'


 const FilesTable = ({files, deleteFile}) => {


        return(
            <tbody>
                <tr>
                    <th>{files.id}</th>
                    <td>{files.tittel}</td>
                    <td>{files.type}</td>
                    <td>{files.sistendret}</td>
                    <td><button key={files.id} onClick={() => {deleteFile(files.id)}}>DEL</button></td>
                </tr>
            </tbody>
        )
}


export default FilesTable