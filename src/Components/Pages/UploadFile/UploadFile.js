import React from 'react'
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'

export default class NewFile extends React.Component {
    render() {
        return(
            <Form>
                {/* Textarea to give your files a name for the system  */}
                <FormGroup>
                    <Label for="exampleText" > Legg ved kommentar til fil </Label>
                    <Input type="textarena" name="text" id="exampletext" />    
                </FormGroup>

                {/* Standarized button and selector for selecting files */}
                <FormGroup>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Velg filen du ønsker å laste opp! 
                    </FormText>
                </FormGroup>

                {/* Button for submitting     */}
                <Button>Last opp</Button>

            </Form>
        )
    }
}