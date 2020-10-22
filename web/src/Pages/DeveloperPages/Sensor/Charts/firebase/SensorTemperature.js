import React from 'react';
import {Line} from 'react-chartjs-2';
// Firebase Imports
import * as firebase from "firebase/app";
import "firebase/database";
var database = firebase.database();

class SensorTemperatureChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sensorData:'',
            sensorTimes:'',
            sensorValues:'',
        }
    }

    componentDidMount(){
        var data = {
            sensorType: 'temp'
        }
        var request = new Request('http://localhost:3001/api/getSensorData', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request).then(function(response) {
            response.json().then(function(data){
                console.log(data);
            })
        }).catch(function(err){
            console.log(err)
        });

        database.ref('server/sensorTemp').on('value', (snapshot)=>{
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
                        // Parse timestamp
                        let date = new Date(item.senTemp.timestamp);
                        let newDate = date.toString();
                        date = new Date(newDate);
                        let day = date.getDate();
                        let month = date.getMonth()+1;
                        let year = date.getFullYear();
                        let hour = date.getHours()-3;
                        let minutes = date.getMinutes();
                        let newTimestamp = day.toString() + "-" + month.toString() + "-" + year.toString() + "/" + hour.toString() +":"+ minutes.toString();
                        sensorTimes.push(newTimestamp);
                        sensorValues.push(item.senTemp.value);
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
                    label: 'Temperature (Celsius)',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'round',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(220,220,220,1)',
                    pointBackgroundColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.sensorValues
                }
            ]
        };

        return (
            <div>
                <Line data={data} />
            </div>
        )
    }
}

export default SensorTemperatureChart;
