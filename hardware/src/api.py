#! usr/bin/python3
import requests
import datetime
import json
import logging
from requests.exceptions import Timeout

#TODO: Add documentation and ensure API well defined 
class User:
    def __init__(self,id=None):
        self.id = id

    def to_json(self):
        return json.dumps(self.__dict__)

#TODO: Add documentation and ensure API well defined 
class Sensor:
    def __init__(self,type="temp"):
        self.type = type
    
    def to_json(self):
        return json.dumps(self.__dict__)

json_format = "{{\"user\":{},\"sensor\":{},\"data\":{}}}"

class WebAPI:
    def __init__(self,base_url="localhost:8080",offline=True):
        self.base_url = base_url
        self.offline = offline


    def send_data(self, user ,sensor,data):
        if self.offline:
            print("Sending Data => " + json_format.format(user.to_json(),sensor.to_json(),data))
        else:
            try:
                r2 = requests.post(self.base_url,
                json= json_format.format(user.to_json(),sensor.to_json(),data),
                timeout=10)
                logging.info("status code: {}".format(r2.status_code))
            except Timeout:
                logging.error("Timeout Occured")
                return None


if __name__ == "__main__":
    offline_api = WebAPI(offline=True)
    offline_api.send_data(User("Hello World"),Sensor("Test"),"{foobar:30}")