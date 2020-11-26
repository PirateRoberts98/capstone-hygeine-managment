import React from 'react';

//ReactStrap
import {Row, Card, CardBody} from 'reactstrap';

const awsConnection = require('../config/config.json');

class MessagesComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
    }

    render() {
        return (
            <div>
                <Card className="main-card mb-3"><CardBody><Row key='1' form>Message: </Row></CardBody></Card>
            </div>
        )
    }
}

export default MessagesComponent;