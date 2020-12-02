import React from 'react';

//ReactStrap
import {Row, Card, CardBody} from 'reactstrap';

const awsConnection = require('../config/config.json');

class MessagesComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messagesArray: []
        }
    }

    componentDidMount(){
        this.retrieveMessages()
        setInterval(
            this.retrieveMessages(),
            60000
        );
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
                            let msg = <Card className="main-card mb-3"><CardBody><Row key={index} form>From: {item.senderId[index]}. Message: {item.message[index]}.</Row></CardBody></Card>;
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
                {this.state.messagesArray}
            </div>
        )
    }
}

export default MessagesComponent;