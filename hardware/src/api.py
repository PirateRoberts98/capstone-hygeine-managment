#! usr/bin/python3
import requests
import datetime
import json
from requests.exceptions import Timeout

class User:
    def __init__(self,id=None):
        self.id = id

    def to_json(self):
        return json.dumps(self.__dict__)

class Sensor:
    def __init__(self,type="temp"):
        self.type = type
    
    def to_json(self):
        return json.dumps(self.__dict__)



class WebAPI:
    def __init__(self,base_url="localhost:8080",offline=True,):
        self.base_url = base_url
        self.offline = offline


    def send_data(self, user ,sensor,data):
        if self.offline:
            print("Sending Data => {{\"user\":{},\"sensor\":{},\"data\":{}}}".format(user.to_json(),sensor.to_json(),data))
        else:
            try:
                r2 = requests.post(self.base_url + "/sensor/temperature",
                json="Sending Data => {{\"user\":{},\"sensor\":{},\"data\":{}}}".format(user.to_json(),sensor.to_json(),data),
                timeout=10)
                print(r2.status_code)
            except Timeout:
                return None