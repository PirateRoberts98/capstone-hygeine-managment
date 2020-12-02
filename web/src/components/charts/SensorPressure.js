import React from 'react';
import {Bar} from 'react-chartjs-2';
const awsConnection = require('../../config/config.json');

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
        this.retrieveData();
        setInterval(() => {
            this.retrieveData();
        }, 5000);
    }

    retrieveData = () => {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getSensorDataPressure', {
            method: 'GET',
        });
        fetch(request).then(function(response) {
            response.json()
                .then(function(data){
                    if(data){
                        let sensorDataObjects = data;
                        let sensorTimes = [];
                        let sensorValues = [];
                        let sensorDataFulfilled = []
                        sensorDataObjects.map(item => {
                            var date = new Date(item.timestamp*1000);
                            var stringDate = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
                                sensorTimes.push(stringDate);
                                sensorValues.push(item.value);
                            }
                        })
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