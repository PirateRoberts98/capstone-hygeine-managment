import json
import time

#http://localhost:3001/api/getSensorDataTemperature

#variables for alarn fuctions

humidity = {
            'highest_value' : 75,
            'lowest_value' : 35
        }
temperature = {
            'highest_value' : 26,
            'lowest_value' : 16
        }

minLimit = 1 
hourLimit = 8
entrLimit = 6
useLimit = 2

#counters
counterU = 0 
counterE = 0
timerM = None
timerH = None

#output
output = {
            'status' : None,
            'messege' : None
        }
#def get():


def convertHours(time):
    hours=((time)/(1000000*60*60))%24
    return hours

def convertMin(time):
    minutes=(time/(1000000*60))%60
    return minutes

#messures one intervals between two timestamps
def counter(data,t):
    global timerH, timerM
    if t == 'm':
        if timerM == None:
            timerM = convertMin(data['data']['timestamp'])
            return False
        elif ( convertMin(data['data']['timestamp']) - timerM) >= 1:
            return True
        else:
            return False
    elif t == 'h':
        if timerH == None:
            timerH = convertHours(data['data']['timestamp'])
            return False
        elif ( convertHours(data['data']['timestamp']) - timerH) <= 24:
            return True
        else:
            return False



#function checks
def waterTemperature(data):
    global temperature
    if data['data']['value'] > temperature['highest_value']:
        f = counter(data,'m')
        if f == True:
            print('ALARM: water temperature is above limit for more than a min')
    elif data['data']['value'] < temperature['lowest_value']:
        f = counter(data,'m')
        if f == True:
            print('ALARM: water temperature is below limit for more than a min')
    else:
        timerM = 0

#function checks how many times pecient enered washroom
def timesEntered(data, b):
    global counterE, entrLimit
    if data['data']['value'] == True:
        counterE = counterE + 1
    if b == True and counterE < entrLimit:
        print('ALARM: for past day person entered washroom: ',counterE)

#function checks if humidity level doesn't go beyond safe limits
def humidityLevel(data):
    global humidity
    if data['data']['value'] > humidity['highest_value']:
        print('ALARM: himidity is too high')
    elif data['data']['value'] < humidity['lowest_value']:
        print('ALARM: himidity is too low')

#function checks how many times pecient used tab, shower, etc.
def timesUsed(data, b):
    global counterU, useLimit
    if data['data']['value'] == True:
        counterU = counterU + 1
    if b == True and counterU < useLimit:
        print('ALARM: for past day person entered washroom: ',counterU)



  

     

