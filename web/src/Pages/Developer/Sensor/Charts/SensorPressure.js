import React from 'react';
import {Bar} from 'react-chartjs-2';
// Firebase Imports
import * as firebase from "firebase/app";
import "firebase/database";
var database = firebase.database();

class SensorPressureChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorData:'',
            sensorTimes:'',
            sensorValues:'', 
        }
    }

    componentDidMount(){
        database.ref('server/sensorPressure').on('value', (snapshot)=>{
            if(this.state.sensorData != snapshot.val() && snapshot.val() != null){
                let sensorDataObjects = snapshot.val();
                let sensorDataArray = [];
                let sensorTimes = [];
                let sensorValues = [];
                let key;
                for(let i=0; i < Object.keys(sensorDataObjects).length; i++){
                    key = Object.keys(sensorDataObjects)[i];
                    sensorDataArray.push(sensorDataObjects[key]);
                }
                sensorDataArray.map(item => {
                    if(item != undefined) {
                        sensorTimes.push(item.senPressure.timestamp);
                        if(item.senPressure.value == true) {
                            sensorValues.push(1);
                        } else {
                            sensorValues.push(0);
                        }
                        
                    }
                })
                this.setState({
                    sensorData: sensorDataObjects,
                    sensorTimes: sensorTimes,
                    sensorValues: sensorValues
                });
            }
        });
    }

    render() {
        const data = {
            labels: this.state.sensorTimes,
            datasets: [
                {
                    label: 'Activated = 1',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,1)',
                    hoverBorderColor: 'rgba(220,220,220,1)',
                    borderCapStyle: 'round',
                    data: this.state.sensorValues
                }
            ]
        };

        return (
            <div>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: true
                    }}
                />
            </div>
        )
    }
}

export default SensorPressureChart;