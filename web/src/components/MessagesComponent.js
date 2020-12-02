import React from 'react';

//ReactStrap
import {Row, Card, CardBody} from 'reactstrap';

const awsConnection = require('../config/config.json');

const defaultPatientData = ["Null", "James Lee", "Scott Fulton", "Mike Diep", "Nikita Bliumkin", "Alanna Doyle", "Robert Conrad"];

class MessagesComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messagesArray: []
        }
    }

    componentDidMount(){
        this.retrieveMessages();
        this.interval = setInterval(()=>{
            this.retrieveMessages()
        },5000
        );
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    retrieveMessages = () => {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getMessages/'+this.props.userId, {
            method: 'GET',
        });
        fetch(request).then(function(response) {
            response.json()
                .then(function(data){
                    if(data){
                        // Format into JSX
                        let msgArray = [];
                        data.map((item,index) => {
                            let msg = <Card className="main-card mb-3"><CardBody><Row key={index} form>From: {defaultPatientData[item.senderId]}. Message: {item.message}.</Row></CardBody></Card>;
                            msgArray.push(msg);
                        });

                        return msgArray;
                    }
                })
                .then((msgArray)=>{
                    tht.setState({
                        messagesArray: msgArray
                    });
                })
                .catch(function(err){
                    console.log(err)
                });
        });
    }

    render() {
        return (
            <div>
                {this.state.messagesArray.length>0 &&
                    this.state.messagesArray
                }
                {!(this.state.messagesArray.length>0) &&
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row form>
                                There are no messages.
                            </Row>
                        </CardBody>
                    </Card>
                }
            </div>
        )
    }
}

export default MessagesComponent;