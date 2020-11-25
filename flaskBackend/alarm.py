import json
import time


#constraint variables for alarm fuctions
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
enterLimit = 6
useLimit = 2

#counters
counterU = 0 
counterE = 0
timerM = None
timerH = None
endDayU = False
endDayE = False

#output
output = {
            'status' : False,
            'message' : None
        }


def convertHours(time):
    #hours=((time)/(1000000*60*60))%24
    hours = round(time/(3.6e+9))
    return hours

def convertMin(time):
    #minutes=(time/(1000000*60))%60
    minutes = round(time/(6e+7))
    return minutes



#messures one intervals between two timestamps
def counter(timestampInput,t):
    global timerM, timerH, minLimit, hourLimit, endDayE, endDayU
    if t == 'm':
        if timerM == None:
            timerM = convertMin(timestampInput)
            return False
        elif ( convertMin(timestampInput) - timerM) >= minLimit:
            return True
        else:
            return False
    elif t == 'h':
        if timerH == None:
            timerH = convertHours(timestampInput)
        elif ( convertHours(timestampInput) - timerH) >= hourLimit:
            #endDayU = True
            endDayE = True
        



#function checks temperature limit
def waterTemperature(tempValue, timestampInput):
    global temperature, timerM, output
    #counter(timestampInput,'h')
    if tempValue > temperature['highest_value']:
        f = counter(timestampInput,'m')
        if f == True:
            timerM = None
            output['message'] = 'ALARM: water temperature is above limit for more than a min'
            output['status'] = True
            return (output)
    elif tempValue < temperature['lowest_value']:
        f = counter(timestampInput,'m')
        if f == True:
            timerM = None
            output['message'] = 'ALARM: water temperature is below limit for more than a min'
            output['status'] = True
            return (output)
    else:
        timerM = None

#function checks how many times pecient enered washroom
def timesEntered(pressureValue, timestampInput):
    global counterE, timerH, enterLimit, output, endDayE, endDayU
    counter(timestampInput,'h')
    if pressureValue == True:
        counterE = counterE + 1
    if endDayE == True and counterE < enterLimit:
        endDayE = False
        counterE = 0
        timerH = None
       # if endDayU == False:
            #timerH = None
        output['message'] = 'ALARM: for past day person used tap required number of times'
        output['status'] = True
        return json.dumps(output)
    elif endDayE == True and counterE >= enterLimit:
        endDayE = False
        counterE = 0
        timerH = None

        #if endDayU == False:
            #timerH = None
       

#function checks if humidity level doesn't go beyond safe limits
def humidityLevel(humidityValue):
    global humidity, output
    #counter(timestampInput,'h')
    if humidityValue> humidity['highest_value']:
        output['message'] = 'ALARM: humidity is too high'
        output['status'] = True
        return output
    elif humidityValue < humidity['lowest_value']:
        output['message'] = 'ALARM: humidity is too low'
        output['status'] = True
        return output

#!!!NOT IMPLEMENTED TO MAIN ATM. DETACHED FUNCTION
#function checks how many times pecient used tab, shower, etc.
def timesUsed(pressureValue, timestampInput):
    global useLimit, output, timerH , counterU, endDayU, endDayE
    counter(timestampInput,'h')
    if pressureValue == True:
        counterU = counterU + 1
    if endDayU == True and counterU < useLimit:
        counterU = 0
        endDayU = False
        if endDayE == False:
            timerH = None
        output['message'] = 'ALARM: for past day person used tap required number of times'
        output['status'] = True
        return json.dumps(output)
    elif endDayU == True and counterU >= useLimit:
        endDayU = False
        counterU = 0
        if endDayU == False:
            timerH = None




  

     

