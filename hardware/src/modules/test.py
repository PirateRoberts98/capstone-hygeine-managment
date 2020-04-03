url = " http://ec2-18-218-42-73.us-east-2.compute.amazonaws.com:8080"

import requests
import datetime
def main():
    body = {"severity":2 ,"warning_message":"This is a test "}
    body2 = {
            "sensorid":"sensor1", 
            "timestamp": datetime.datetime.utcnow().isoformat() , 
            "value": 10.0
        }
    body3 = {
            "sensorid": "sensor2" , 
            "timestamp": datetime.datetime.utcnow().isoformat() , 
            "value": True
    }
    #r1 = requests.post(url + "/alert",json=body,timeout=10)
    #print(r1.status_code)
    r2 = requests.post(url + "/sensor/temperature",json=body2,timeout=10)
    print(r2.status_code)
    #r3 = requests.post(url + "/sensor/pressure",json=body3,timeout=10)
    #print(r3.status_code)

if __name__ == "__main__":
    main()