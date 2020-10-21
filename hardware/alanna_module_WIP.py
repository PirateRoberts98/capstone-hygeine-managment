# Python program to queue temperature data

#import temperature file (replace w scotts eventually)
from temp_api_hardware import WebAPI
from tempature_sensor import TempatureSensor
from pressure_sensor import PressureSensor
import datetime
import time

def temp_sensor_module():
    #create instance of WebAPI
    WAPI = WebAPI(offline=True)
    #create instance of temperature sensor (working from github temperature_sensor.py file
    tsens = TempatureSensor(True)
    #tmp loop, change to for when scott file
    while True:
        file=open("temperaturedata.txt","a+")
        #send temp sensor value to API
        WAPI.send_data("Steve","Tempature_01",tsens.read_sensor())
        #if sensor not reading, temp null message in log
        if(tsens.read_sensor()==None):
            file.write('temperature was null at time '+str(datetime.datetime.now())+'\n')
        else:
            #log temp and time in file
            file.write('temperature was: '+str(tsens.read_sensor())+' at time '+str(datetime.datetime.now())+'\n')
        #wait before accessing sensor again
        time.sleep(5)          

    file.close()

def pres_sensor_module():
    #create instance of WebAPI
    WAPI = WebAPI(offline=True)
    #create instance of pressure sensor (working from github pressure_sensor.py file
    psens = PressureSensor(True)
    #tmp loop, change to for when scott file
    while True:
        file=open("pressuredata.txt","a+")
        #send pressure sensor value to API
        WAPI.send_data("steve","Pressure_01",psens.read_from_sensor())
        #if sensor not reading, pressure null message in log
        if(psens.read_from_sensor()==None):
            file.write('pressure was null at time '+str(datetime.datetime.now())+'\n')
        else:
            #log temp and time in file
            file.write('pressure was: '+str(psens.read_from_sensor())+' at time '+str(datetime.datetime.now())+'\n')
        #wait before accessing sensor again
        time.sleep(5)          

    file.close()
