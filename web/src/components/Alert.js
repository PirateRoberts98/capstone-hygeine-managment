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
            sensorPressureMessages: [],
            errorRetrievingData: true,
            errorRetryCount:0
        }

        this.retrieveDataHumdity = this.retrieveDataHumdity.bind(this);
        this.retrieveDataPressure = this.retrieveDataPressure.bind(this);
        this.retrieveDataTemperature = this.retrieveDataTemperature.bind(this);
    }

    componentDidMount(){
        this.retrieveDataHumdity();
        this.retrieveDataPressure();
        this.retrieveDataTemperature();
        this.interval = setInterval(() => {
            this.retrieveDataHumdity();
            this.retrieveDataPressure();
            this.retrieveDataTemperature();
        }, 120000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.setState({
            errorRetryCount: 0
        });
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
                                console.log(item.message);
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
                    if(msgArray.length > 0) {
                        tht.setState({
                            sensorHumidityMessages: msgArray,
                        });
                    }
                    tht.setState({
                        errorRetrievingData: false
                    });
                })
                .catch(function(err){
                    if(this.state.errorRetryCount === 5) {
                        clearInterval(this.interval);
                    }
                    tht.setState({
                        errorRetrievingData: true,
                        errorRetryCount: this.state.errorRetryCount + 1
                    })
                    console.log(err);
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
                    if(msgArray.length>0){
                        tht.setState({
                            sensorMessages: msgArray,
                        });
                    }
                    tht.setState({
                        errorRetrievingData: false
                    });
                })
                .catch(function(err){
                    console.log(err)
                    tht.setState({
                        errorRetrievingData: true
                    });
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
                    if(msgArray.length>0) {
                        tht.setState({
                            sensorPressureMessages: msgArray,
                        });
                    }
                    tht.setState({
                        errorRetrievingData: false
                    });
                })
                .catch(function(err){
                    console.log(err)
                    tht.setState({
                        errorRetrievingData: true
                    });
                });
        });
    }

    render() {
        return (
            <div>
                {/** Display this if can't fetch data */}
                {this.state.errorRetrievingData &&
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row form>No alerts to be displayed...</Row>
                        </CardBody>
                    </Card>
                }
                {/** Display this if no message for humidity */}
                {!this.state.errorRetrievingData &&
                    !(this.state.sensorHumidityMessages.length > 0) &&
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row form>No alerts from Humidity sensor...</Row>
                        </CardBody>
                    </Card>
                }
                {/** Display this if have message for humidity */}
                {!this.state.errorRetrievingData &&
                    (this.state.sensorHumidityMessages.length > 0) &&
                        this.state.sensorHumidityMessages
                }
                {/** Display this if no message for pressure */}
                {!this.state.errorRetrievingData &&
                    !(this.state.sensorPressureMessages.length > 0) &&
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row form>No alerts from pressure sensor...</Row>
                        </CardBody>
                    </Card>
                }
                {/** Display this if have message for pressure */}
                {!this.state.errorRetrievingData &&
                    (this.state.sensorPressureMessages.length > 0) &&
                        this.state.sensorPressureMessages
                }
                {/** Display this if no message for temperature */}
                {!this.state.errorRetrievingData &&
                    !(this.state.sensorTemperatureMessages.length > 0) &&
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row form>No alerts from temperature sensor...</Row>
                        </CardBody>
                    </Card>
                }
                {/** Display this if have message for temperature */}
                {!this.state.errorRetrievingData &&
                    (this.state.sensorTemperatureMessages.length > 0) &&
                        this.state.sensorTemperatureMessages
                }
            </div>
        )
    }
}

export default Alert;