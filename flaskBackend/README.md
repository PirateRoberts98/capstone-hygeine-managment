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
`/api/register` - Register users [Post]

`/api/postSensorData` - Insert sensor Data [Post]

`/api/getSensorDataTemperature` - retrieve sensor data filtered by "temperature" ['GET']

`/api/getSensorDataPressure` - retrieve sensor data filtered by "pressure" ['GET']