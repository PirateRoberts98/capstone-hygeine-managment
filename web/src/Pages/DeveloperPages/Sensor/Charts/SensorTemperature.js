import React from 'react';
import {Line} from 'react-chartjs-2';
const awsConnection = require('../../../../config/config.json');

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
        this.retrieveData();
        setInterval(() => {
          this.retrieveData();
        }, 5000);
      }

    retrieveData = () => {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getSensorDataTemperature', {
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