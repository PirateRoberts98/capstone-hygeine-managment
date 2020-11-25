import React from 'react';

//ReactStrap
import {Row, Card, CardBody} from 'reactstrap';

const awsConnection = require('../config/config.json');

class Alert extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sensorMessages: []
        }
    }

    componentDidMount(){
        this.retrieveData();
        setInterval(() => {
            this.retrieveData();
        }, 5000);

        /*database.ref('server/alert').on('value', (snapshot) => {
            if(this.state.alerts != snapshot.val() && snapshot.val() != null){
                let alertDataObjects = snapshot.val();
                let alertDataArray = [];
                let alertSeverityArray = [];
                let alertWarningMessage = [];
                let key;
                for(let i=0; i < Object.keys(alertDataObjects).length; i++){
                    key = Object.keys(alertDataObjects)[i];
                    alertDataArray.push(alertDataObjects[key]);
                }
                alertDataArray.map(item => {
                    if(item != undefined) {
                        alertSeverityArray.push(item.alert.severity);
                        alertWarningMessage.push(item.alert.warning_message);
                    }
                });
                // Format into JSX
                let msgArray = []
                for(let j=alertWarningMessage.length-1; j > -1; j--) {
                    let msg = <Card className="main-card mb-3"><CardBody><Row key={j} form>Alert with severity: {alertSeverityArray[j]}. The warning message: {alertWarningMessage[j]}.</Row></CardBody></Card>;
                    msgArray.push(msg);
                }
                this.setState({
                    alerts: alertDataObjects,
                    alertArray: msgArray,
                });
            }
        });*/
    }

    retrieveData = () => {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getSensorDataHumidity', {
            method: 'GET',
        });
        fetch(request).then(function(response) {
            response.json()
                .then(function(data){
                    if(data){
                        let sensorDataObjects = data;

                        // Initialize Arrays to store separate attributes of the Sensor Data Object.
                        let sensorTimesArray = [];
                        let sensorMessagesArray = [];

                        // Map the Sensor Data Object to appropriate arrays.
                        sensorDataObjects.map(item => {
                            if(item != undefined) {
                                sensorTimesArray.push((item.timestamp).toString());
                                sensorMessagesArray.push(item.message);
                            }
                        });

                        // Remove duplicate messages
                        sensorMessagesArray = sensorMessagesArray.filter((value,index) => sensorMessagesArray.indexOf(value) === index);

                        // Format into JSX
                        let msgArray = []
                        for(let j=sensorMessagesArray.length-1; j > -1; j--) {
                            let msg = <Card className="main-card mb-3"><CardBody><Row key={j} form>Alert with severity: null. The warning message: {sensorMessagesArray[j]}.</Row></CardBody></Card>;
                            msgArray.push(msg);
                        }

                        return msgArray;
                    }
                })
                .then((msgArray)=>{
                    tht.setState({
                        sensorMessages: msgArray
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
                {this.state.sensorMessages}
            </div>
        )
    }
}

export default Alert;