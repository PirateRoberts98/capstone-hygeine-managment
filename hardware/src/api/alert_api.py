import api
class AlertHandler(api.APIHandler):
    def __init__(self,base):
        api.APIHandler.__init__(self,base+"/alert")
    
    def add_alert(self,severity,message):
        if (not severity.is_integer()):
            severity = -1
        if message is None:
            message = ""
        data = {
            "severity":severity , 
            "warining_message":message
        }
        if super().send_api_data(None,data):
            return True
        else:
            #TODO: Replace exception
            return ConnectionError
        return 