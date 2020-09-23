
import requests
from requests.exceptions import Timeout

class APIHandler:
    def __init__(self,base):
        self.base = base
        return 
    
    def check_avaliable(self):
        return False

    def send_api_data(self,extention, body):
        if extention == None:
            extention = ""
        try:
            response =  requests.post(self.base + extention,json=body,timeout=10)
            if response.status_code == 201 :
                return True
            else:
                return False
        except Timeout:
            return None 
        return 

    def get_api_data(self,extention,body):
        if extention == None:
            extention = ""
        try:
            response =  requests.get(self.base + extention,json=body,timeout=10)
            if response.status_code == 200 :
                return True
            else:
                return False
        except Timeout:
            return None 
        return

import datetime
class PressureHandler(APIHandler):
    instance = 1
    def __init__(self,base,offline=False):
        self.sensorid = "pressure{}".format(PressureHandler.instance)
        PressureHandler.instance = PressureHandler.instance + 1
        APIHandler.__init__(self,base+"/sensor/pressure")
        self.offline = offline
    
    def add_sensor_data(self,value):
        if not isinstance(value,bool):
            return TypeError #Do not send
        data = {
            "sensorid":self.sensorid , 
            "timestamp": datetime.datetime.utcnow().isoformat() , 
            "value": value
        }
        if self.offline:
            print( "Sending Data :%s" % data)
            return True 
        if super().send_api_data(None,data):
            return True
        else:
            #TODO: Replace exception
            return ConnectionError
        return 

    def get_sensor_data(self,data):
        if super().get_api_data(None,{"amount":data}):
            return True
        else:
            #TODO: Replace exception
            return ConnectionError
        return 


