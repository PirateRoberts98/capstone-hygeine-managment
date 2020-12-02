#! usr/bin/python3
import requests
import datetime
import json
import logging
from datetime import datetime
import time
import pytz
from requests.exceptions import Timeout


def get_time():
    return time.time()

def timestamp_data(value):
    return '{{"timestamp":{},"value":{}}}'.format(get_time(),value)

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
    def __init__(self,user_info,base_url="localhost:8080",offline=True):
        self.base_url = base_url
        self.offline = offline
        self.user_info = user_info


    def send_data(self,sensor,data):
        if self.offline:
            print("Sending Data => " + json_format.format(self.user_info.to_json(),sensor.to_json(),data))
        else:
            try:
                r2 = requests.post(self.base_url,
                json= json_format.format(self.user_info.to_json(),sensor.to_json(),data),
                timeout=10)
                logging.info("status code: {}".format(r2.status_code))
            except Timeout:
                logging.error("Timeout Occured")
                return None


if __name__ == "__main__":
    offline_api = WebAPI(User("Hello World"),offline=True)
    offline_api.send_data(Sensor("Test"),"{foobar:30}")
