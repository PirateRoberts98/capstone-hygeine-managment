Server hosted on `port: 3001`

## Prerequisites

* python
* pip

`curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`

`python get-pip.py`
* Flask

### Dependencies
`pip3 install Flask`

`pip3 install CORS`

`pip3 install Bcrypt`

`pip3 install psycopg2`

## API Calls
`/api/register` - Register users ['POST']

`/api/login` - Login user ['POST']

`/api/postSensorData` - Insert sensor Data ['POST']

`/api/getSensorDataTemperature` - retrieve sensor data filtered by "temperature" ['GET']

`/api/getSensorDataPressure` - retrieve sensor data filtered by "pressure" ['GET']

`/api/postMessage` - store message data that is sent to doctor or patient ['POST']

`/api/getMessages/<receiverId>` - retrieve all messages by its userId ['GET']



## Templates
### SensorData Template example:

```
[
    {
        "message": null, 
        "sensorId": 1, 
        "sensorType": "Temperature", 
        "status": false, 
        "timestamp": 1603340408, 
        "userId": "John Doe", 
        "value": 19
    }, 
    {
        "message": "ALARM: water temperature is below limit for more than a min", 
        "sensorId": 1, 
        "sensorType": "Temperature", 
        "status": true, 
        "timestamp": 1603340535, 
        "userId": "John Doe", 
        "value": 9
    }
    ...
]
```
### Messages Template example:
```
[
  {
    "message": "ho",
    "messageId": 1,
    "receiverId": 2,
    "senderId": 1
  }
]
```