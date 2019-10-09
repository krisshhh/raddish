import React from "react";
import { Form, Button, Card } from 'semantic-ui-react'


const TapForm = ({ tab, rabbitmq, formChange }) => {

    function handleChange(route, event) {
        const { exchange, bindingKey } = tab;
        const form = { exchange, bindingKey };
        form[event.id] = event.value;
        formChange(form);
    }

    return <Card fluid>
        <div className="app-tap-form">
            <div className="controls">
                <Form size={ 'mini' }>
                    <Form.Group widths='equal' >
                        <Form.Input
                            fluid
                            id='exchange'
                            label='Exchange'
                            value={ tab.exchange } 
                            onChange={ handleChange }
                            />
                        <Form.Input
                            fluid
                            id='bindingKey'
                            label='Binding Key'
                            value={ tab.bindingKey } 
                            onChange={ handleChange }
                            />
                    </Form.Group>
                </Form>
            </div>
            <div className="action">
                <Button primary>Tap</Button>
            </div>
        </div>
    </Card>
};

export default TapForm;