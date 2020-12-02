import React from 'react';

//ReactStrap
import {Row, Card, CardBody} from 'reactstrap';

const awsConnection = require('../config/config.json');

class Alert extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sensorHumidityMessages: [],
            sensorTemperatureMessages: [],
            sensorPressureMessages: []
        }
    }

    componentDidMount(){
        this.retrieveDataHumdity();
        this.retrieveDataPressure();
        this.retrieveDataTemperature();
        setInterval(() => {
            this.retrieveDataHumdity();
            this.retrieveDataPressure();
            this.retrieveDataTemperature();
        }, 60000);
    }

    retrieveDataHumdity = () => {
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
                        sensorHumidityMessages: msgArray
                    });
                })
                .catch(function(err){
                    console.log(err)
                });
        });
    }

    retrieveDataTemperature = () => {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getSensorDataTemperature', {
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

    retrieveDataPressure = () => {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getSensorDataPressure', {
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
                        sensorPressureMessages: msgArray
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
                {this.state.sensorHumidityMessages}
                {this.state.sensorPressureMessages}
                {this.state.sensorTemperatureMessages}
            </div>
        )
    }
}

export default Alert;