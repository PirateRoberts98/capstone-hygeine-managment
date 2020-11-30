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

    render() {
        return (
            <div>
                {this.state.alertArray}
            </div>
        )
    }
}

export default Alert;