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
        var tht = this;
        var data = {
            type: "Pressure"
        };
        var request = new Request('http://ec2-35-182-173-184.ca-central-1.compute.amazonaws.com:3001/api/getsensordata', {
            mode: 'no-cors',
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json' }),
            body: JSON.stringify(data)
        });
        fetch(request).then(function(response) {
            response.json()
                .then(function(data){
                    if(data){
                        //console.log(data);
                        let sensorDataObjects = data;
                        let sensorTimes = [];
                        let sensorValues = [];
                        let sensorDataFulfilled = []
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
                        })
                        let temp = [sensorTimes,sensorValues]
                        sensorDataFulfilled.push(temp);
                        return sensorDataFulfilled;
                    }
                })
                .then((sensorDataFulfilled)=>{
                    console.log(sensorDataFulfilled)
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
        console.log(data);
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