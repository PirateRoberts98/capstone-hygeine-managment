

To Run application: run the following
python hardware/main.py --mock --base_url http://ec2-18-218-42-73.us-east-2.compute.amazonaws.com:8080


$ docker build -t my-python-app .
$ docker run -it --rm --name my-running-app my-python-app


## Configuration

There is a config.yaml file included in the folder. This folder is used to set values used by the system. 

**Url** : Url to the server application
**offline** : Assume no access to network and run locally (mock web)
**mock_sensor** : Use mocking for sensors (good for docker deployments)


All configs can be overriden through commands




``` Json
// POST Sensor Data
{
    "device_id": "string",
    "timestamp": "string",
    "user":{
        "id":-1 ,
        "name": "lorem"
    },
    "sensor":{
        "id":-1,
        "type": "temp"
    },
    "data":{
        "timestamp": "<ISO time>",
        "value": 420
    }
}
```