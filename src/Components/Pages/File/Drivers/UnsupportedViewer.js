
import React from 'react';
import {Alert, Button} from 'reactstrap'
export const UnsupportedViewer = (props) => {
    return <Alert className='text-center' color='secondary'>
         <h5>Denne filen kan ikke forhåndsvises.</h5>
        <Button color='primary' onClick={props.download}>Last ned</Button>
    </Alert>
}