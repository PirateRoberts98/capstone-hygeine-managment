#!/usr/local/bin/python3

import configuration as cf

#Local Imports
import api


# External Imports 
import time , argparse , yaml ,logging , sys ,threading , queue
from datetime import datetime

config = None



def pressure_sensor_thread(next,delay,stop,sensor,api_queue,interpretor):
    logging.info("Running Sensor Data")
    data = sensor.read_from_sensor()
    if interpretor != None:
        if interpretor.predict(data)[0]:  
            api_queue.put({"sensor_info":sensor.api_info,"value":data})
        else:
            data = 0
            api_queue.put({"sensor_info":sensor.api_info,"value":data})
    if config["stop"] == False: # Continue Thread if not stopped
        threading.Timer(delay,next,args=[
            next,delay,stop,sensor,api_queue,interpretor]).start()
    else:
        logging.info("Stopping Pressure Thread")
    return 

def tempature_humdity_sensor_thread(next,delay,stop,sensor,api_queue):
    logging.info("Running Sensor Data")
    sensor.read_from_sensor()
    api_queue.put({"sensor_info":sensor.temp_api_info,"value":sensor.tempVal})
    api_queue.put({"sensor_info":sensor.hum_api_info,"value":sensor.humidityVal})
    if config["stop"] == False: # Continue Thread if not stopped
        threading.Timer(delay,next,args=[
            next,delay,stop,sensor,api_queue]).start()
    else:
        logging.info("Stopping Temp Humidity Thread")
    return

def read_sensor_thread(next,delay,stop,sensor,api_queue):
    logging.info("Running Sensor Data")
    data = sensor.read_from_sensor()
    api_queue.put({"sensor_info":sensor.api_info,"value":data})
    if config["stop"] == False: # Continue Thread if not stopped
        threading.Timer(delay,next,args=[
            next,delay,stop,sensor,api_queue]).start()
    else:
        logging.info("Stopping Read Thread")
    return 


def init():
    '''
    Initialize data for system for outside usage, including logging, config files and arguments
    '''
    global config
    cf.setup_logging()
    config = cf.parse_config()
    args = cf.create_arguments() 
    # Update configurations if arguments are different 
    config["base_url"]= args.base_url if args.base_url else config["base_url"]
    config["mock"] = True if args.mock else config["mock"] 
    config["offline"] = True if args.offline else config["offline"]
    config["stop"] = False  

    # None ideal but allows mockable sensors to run without issues.




def main():
    '''

    '''
    import ai as ai
    import read_sensor as read
    if config["mock"]:
        import mock_GPIO as GPIO # Warning: NOT FULL COVERAGE 
        import mock_pressure as pressure
        import mock_temp as tempature
        import ai as ai
    else:
        try:
            import RPi.GPIO as GPIO
        except ImportError:
            pass # Not ideal but saves issues with building on none pi devices 
        import pressure_sensor as pressure 
        import temp_humidity_sensor as tempature


    user_info = api.User("John Doe") #TODO log user create to debug 
    temp_sensor_info = api.Sensor("Temperature")  #TODO log user create to debug
    humidity_sensor_info = api.Sensor("Humidity")
    pressure_sensor_info = api.Sensor("Pressure")
    read_sensor_info = api.Sensor("Read")
    web_api = api.WebAPI(user_info,base_url=config["base_url"],offline=config["offline"])
    temp_humidity = tempature.TempAndHumiditySensor(temp_api_info=temp_sensor_info,hum_api_info=humidity_sensor_info)
    pressure_sensor = pressure.PressureSensor(pressure_sensor_info)
    read_sensor = read.ReadSensor(11,read_sensor_info)
    api_queue = queue.Queue()
    aiInterpretor = ai.aiModule()
    aiInterpretor.trainSensor()
    pressure_sensor_thread(pressure_sensor_thread,6,config,pressure_sensor,api_queue,aiInterpretor)
    tempature_humdity_sensor_thread(tempature_humdity_sensor_thread,6,config,temp_humidity,api_queue)
    read_sensor_thread(read_sensor_thread,6,config,read_sensor,api_queue)
    #  start threading, apply queue
    try:
        while True:
            if api_queue.full():
                logging.warn("Queue is full!")
            #Stalls until value exists
            q = api_queue.get()
            web_api.send_data(q["sensor_info"],api.timestamp_data(q["value"]))
    except KeyboardInterrupt:
        config["stop"]=True
        pass #Leave system as expected
    finally:
        GPIO.cleanup()    
    


if __name__ == "__main__":
    init()
    main()