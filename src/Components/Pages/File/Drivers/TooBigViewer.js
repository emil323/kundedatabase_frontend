import React from 'react';
import {Alert, Button} from 'reactstrap'
export const TooBigViewer = (props) => {
    return <Alert className='text-center' color='secondary'>
        <h5>Denne filen kan ikke forhåndsvises fordi den er for stor.</h5>
        <Button color='primary' onClick={props.download}>Last ned</Button>
    </Alert>
}