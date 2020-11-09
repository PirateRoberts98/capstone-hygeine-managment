import json
import time


#variables for alarn fuctions
humidity = {
            'highest_value' : 75,
            'lowest value' : 35
        }
temperature = {
            'highest_value' : 26,
            'lowest value' : 16
        }

minLimit = 1 
hourLimit = 8
entranceLimit = 6
useLimit = 2

#counters
counterU = 0 
counterE = 0
timerM = 0
timerH =0

#def get():


def convertHours(time):
    hours=((time)/(1000000*60*60))%24
    return hours

def convertMin(time):
    minutes=(milli/(1000000*60))%60
    return minutes

#messures one intervals between two timestamps
def counter(data,t):
    if t == 'm'
        if timerM == 0:
            timerM = convertMin(data['value']['timestamp'])
            return False
        elif (h - timerM) >= 1:
            return True
        else:
            return False
    elif t == 'h'
        if timerH == 0:
            timerH = convertHours(data['value']['timestamp'])
            return False
        elif (h - timerM) >= 24:
            return True
        else:
            return False



#function checks
def waterTemperature(data):
    if data['data']['value'] > humidity['highest_value']:
        f = counter(data,'m')
        if f == True:
            print('ALARM: water temperature is above limit for more than a min')
    elif data['data']['value'] < humidity['smallest_value']:
        f = counter(data,'m')
        if f == True:
            print('ALARM: water temperature is below limit for more than a min')
    else:
        timerM = 0

#function checks how many times pecient enered washroom
def timesEntered(data, b):
    if data['data']['value'] == true:
        counterE = counterE + 1
    if b == True and counterE < entranceLimit:
        print('ALARM: for past day person entered washroom: ',counterE)

#function checks if humidity level doesn't go beyond safe limits
def humidityLevel(data):
    if data['data']['value'] > humidity['highest_value']:
        print('ALARM: himidity is too high')
    elif data < humidity['smallest_value']:
        print('ALARM: himidity is too low')

#function checks how many times pecient used tab, shower, etc.
def timesUsed(data, b):
    if data['data']['value'] == true:
        counterU = counterU + 1
    if b == True and counterU < entranceLimit:
        print('ALARM: for past day person entered washroom: ',counterU)
def main():
    
    
    try:
        while True:
            flag = counter(data,'h')
            humidityLevel(data)
            timesUsed(dat, flag)
            waterTemperature(data)
            timesUsed(data,flag)
    except KeyboardInterrupt:
        pass 


if __name__ == "__main__":
    main()   
     

