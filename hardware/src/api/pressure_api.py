
import api
import datetime
class PressureHandler(api.APIHandler):
    instance = 1
    def __init__(self,base):
        self.sensorid = "pressure{}".format(PressureHandler.instance)
        PressureHandler.instance = PressureHandler.instance + 1
        api.APIHandler.__init__(self,base+"/sensor")
    
    def add_sensor_data(self,value):
        if isinstance(value,bool):
            return TypeError #Do not send
        data = {
            "sensorid":self.sensorid , 
            "timestamp": datetime.datetime.utcnow().isoformat() , 
            "value": value
        }
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

