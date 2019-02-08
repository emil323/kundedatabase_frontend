import React from 'react'
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'

class UploadFile extends React.Component {
   
    render() {
        return(
        
           
            <Form>
                

                {/* Standarized button and selector for selecting files */}
                <FormGroup>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Velg filen du ønsker å laste opp! 
                    </FormText>
                </FormGroup>
               

            </Form>

        )
    }
}

export default UploadFile