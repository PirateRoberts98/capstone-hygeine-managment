
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


class SensorHandler(APIHandler):
    def __init__(self,base):
        APIHandler.__init__(self,base+"/sensor")
    
    def add_sensor_data(self,data):
        if super().send_api_data(None,{"sensor":data}):
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



class AlertHandler(APIHandler):
    def __init__(self,base):
        APIHandler.__init__(self,base+"/alert")
    
    def add_alert(self,data):
        if super().send_api_data(None,{"alert":data}):
            return True
        else:
            #TODO: Replace exception
            return ConnectionError
        return 

def main():
    base_uri ="http://127.0.0.1:5000"
    alert_handler = AlertHandler(base_uri)
    sensor_handler = SensorHandler(base_uri)
    alert_handler.add_alert(True)
    sensor_handler.add_sensor_data(500)
    sensor_handler.get_sensor_data(420)

if __name__ == "__main__":
    main()