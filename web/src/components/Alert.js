import React from 'react';
//ReactStrap
import {Row, Card, CardBody} from 'reactstrap';

// Firebase Imports
//import * as firebase from "firebase/app";
//import "firebase/database";
//var database = firebase.database();

class Alert extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alerts: '',
            alertArray: [],
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
                        let sensorTimes = [];
                        let sensorValues = [];
                        let sensorDataFulfilled = [];
                        sensorDataObjects.map(item => {
                            if(item != undefined) {
                                // Parse timestamp
                                /*let date = new Date(item.timestamp);
                                let newDate = date.toString();
                                date = new Date(newDate);
                                let day = date.getDate();
                                let month = date.getMonth()+1;
                                let year = date.getFullYear();
                                let hour = date.getHours()-3;
                                let minutes = date.getMinutes();
                                let newTimestamp = day.toString() + "-" + month.toString() + "-" + year.toString() + "/" + hour.toString() +":"+ minutes.toString();*/
                                sensorTimes.push((item.timestamp).toString());
                                sensorValues.push(item.value);
                            }
                        });
                        let temp = [sensorTimes,sensorValues]
                        sensorDataFulfilled.push(temp);
                        return sensorDataFulfilled;
                    }
                })
                .then((sensorDataFulfilled)=>{
                    tht.setState({
                        sensorTimes: sensorDataFulfilled[0][0],
                        sensorValues: sensorDataFulfilled[0][1]
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
                {this.state.alertArray}
            </div>
        )
    }
}

export default Alert;