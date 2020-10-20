#! usr/bin/python3

import time 

class User:
    def __init__(self,id=None):
        self.id = id 
        if id == None:
            return None



class Sensor:
    def __init__(self,id=None):
        self.id = id
        if id == None:
            return None



class WebAPI:
    def __init__(self, address="localhost:8080",offline=False):
        self.address = address 
        self.offline = offline

    def match_user(self,id):
        if self.offline:
            return User("TEST")
        else:
            raise NotImplementedError
    def create_user(self,id):
        if self.offline:
            return User("TEST")
        else:
            raise NotImplementedError

    def match_sensor(self,id):
        if self.offline:
            return Sensor("TEST")
        else:
            raise NotImplementedError
    def create_sensor(self,id):
        if self.offline:
            return Sensor("TEST")
        else:
            raise NotImplementedError

    def send_data(self,user,sensor,data):
        if self.offline:
            print("Test Values Users:{},Sensor{},value:{}".format(user,sensor,data))
        else:
            raise NotImplementedError



if __name__ == "__main__":
    print("Hello World")
    server = WebAPI(offline=True)
    user_ref = server.match_user("Steve")
    if user_ref == None:
        user_ref = server.create_user("Steve")
    sensor_ref = server.match_sensor("Tempature_01")
    if sensor_ref == None:
        sensor_ref = server.create_sensor("Tempature01")

    while True:
        time.sleep(5)
        server.send_data(user_ref,sensor_ref,"{Test:True}")