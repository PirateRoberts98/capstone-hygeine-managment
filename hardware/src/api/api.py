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

