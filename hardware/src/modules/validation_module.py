


class SystemValidate:
    def __init__(self,api):
        self.api = api 
        return 

    def validate_tempature(self,data):
        return isinstance(data,float)

    def validate_pressure(self ,data):    
        return isinstance(data,bool)

    def validate_api_pressence(self,api):
        return NotImplemented