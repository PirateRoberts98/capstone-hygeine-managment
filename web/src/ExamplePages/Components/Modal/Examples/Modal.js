import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {
    Col, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <span className="d-inline-block mb-2 mr-2">
                <Button color="primary" onClick={this.toggle}>Basic Modal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>APT</ModalHeader>
                    <ModalBody>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Grid</CardTitle>
                            <Form>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail"
                                               placeholder="with a placeholder"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword"
                                               placeholder="password placeholder"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Select</Label>
                                    <Col sm={10}>
                                        <Input type="select" name="select" id="exampleSelect"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelectMulti" sm={2}>Select Multiple</Label>
                                    <Col sm={10}>
                                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2}>Text Area</Label>
                                    <Col sm={10}>
                                        <Input type="textarea" name="text" id="exampleText"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleFile" sm={2}>File</Label>
                                    <Col sm={10}>
                                        <Input type="file" name="file" id="exampleFile"/>
                                        <FormText color="muted">
                                            This is some placeholder block-level help text for the above input.
                                            It's a bit lighter and easily wraps to a new line.
                                        </FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup tag="fieldset" row>
                                    <legend className="col-form-label col-sm-2">Radio Buttons</legend>
                                    <Col sm={10}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio2"/>{' '}
                                                Option one is this and that—be sure to include why it's great
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio2"/>{' '}
                                                Option two can be something else and selecting it will deselect option
                                                one
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input type="radio" name="radio2" disabled/>{' '}
                                                Option three is disabled
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="checkbox2" sm={2}>Checkbox</Label>
                                    <Col sm={{size: 10}}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" id="checkbox2"/>{' '}
                                                Check me out
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{size: 10, offset: 2}}>
                                        <Button>Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={this.toggle}>Back</Button>
                        <Button color="primary" onClick={this.toggle}>Save Changes</Button>{' '}
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default ModalExample;
