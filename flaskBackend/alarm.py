import json
import time

#http://localhost:3001/api/getSensorDataTemperature

#variables for alarm fuctions

humidity = {
            'highest_value' : 75,
            'lowest_value' : 35
        }
temperature = {
            'highest_value' : 26,
            'lowest_value' : 16
        }

minLimit = 1 
hourLimit = 24
entrLimit = 6
useLimit = 2

#counters
counterU = 0 
counterE = 0
timerM = None
timerH = None

#output
output = {
            'status' : False,
            'message' : None
        }
#def get():


def convertHours(time):
    #hours=((time)/(1000000*60*60))%24
    hours = round(time/(3.6e+9))
    return hours

def convertMin(time):
    #minutes=(time/(1000000*60))%60
    minutes = round(time/(6e+7))
    return minutes

#messures one intervals between two timestamps
def counter(data,t):
    global timerH, timerM, minLimit, hourLimit
    if t == 'm':
        if timerM == None:
            timerM = convertMin(data['data']['timestamp'])
            return False
        elif ( convertMin(data['data']['timestamp']) - timerM) >= minLimit:
            return True
        else:
            return False
    elif t == 'h':
        if timerH == None:
            timerH = convertHours(data['data']['timestamp'])
            return False
        elif ( convertHours(data['data']['timestamp']) - timerH) >= hourLimit:
            return True
        else:
            return False



#function checks temperature limit
def waterTemperature(data):
    global temperature, timerM, output
    if data['data']['value'] > temperature['highest_value']:
        f = counter(data,'m')
        if f == True:
            output['message'] = 'ALARM: water temperature is above limit for more than a min'
            output['status'] = True
            return json.dumps(output)
    elif data['data']['value'] < temperature['lowest_value']:
        f = counter(data,'m')
        if f == True:
            output['message'] = 'ALARM: water temperature is below limit for more than a min'
            output['status'] = True
            return json.dumps(output)
    else:
        timerM = 0

#function checks how many times pecient enered washroom
def timesEntered(data):
    global counterE, entrLimit, output
    flag = counter(data,'h')
    if data['data']['value'] == True:
        counterE = counterE + 1
    if flag == True and counterE < entrLimit:
        output['message'] = 'ALARM: for past day person used tap required number of times'
        output['status'] = True
        return json.dumps(output)
       

#function checks if humidity level doesn't go beyond safe limits
def humidityLevel(data):
    global humidity, output
    if data['data']['value'] > humidity['highest_value']:
        output['message'] = 'ALARM: himidity is too high'
        output['status'] = True
        return json.dumps(output)
    elif data['data']['value'] < humidity['lowest_value']:
        output['message'] = 'ALARM: himidity is too low'
        output['status'] = True
        return json.dumps(output)

#function checks how many times pecient used tab, shower, etc.
def timesUsed(data):
    global counterU, useLimit, output
    flag = counter(data,'h')
    if data['data']['value'] == True:
        counterU = counterU + 1
    if flag == True and counterU < useLimit:
        output['message'] = 'ALARM: for past day person used tap required number of times'
        output['status'] = True
        return json.dumps(output)






  

     

