#!/usr/local/bin/python3

import configuration as cf

#Local Imports
import api

import temp_humidity_sensor
import pressure_sensor
import config





# External Imports 
import time , argparse , yaml ,logging , sys ,  pytz 
from datetime import datetime


config = None

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

    # None ideal but allows mockable sensors to run without issues.
    if config["mock"]:
        import mock_GPIO as GPIO # Warning: NOT FULL COVERAGE 
        import mock_pressure as pressure
        import mock_temp as tempature
    else:
        try:
            import RPi.GPIO as GPIO
        except ImportError:
            pass # Not ideal but saves issues with building on none pi devices 
        import pressure_sensor as pressure 
        import temp_humidity_sensor as tempature

def cleanup():
    # TODO Add GPIO Cleanup if necessary 
    logging.info("Closing System")
    return NotImplementedError


def main():
    '''

    '''
   user_info = api.User("John Doe") #TODO log user create to debug 
    temp_sensor_info = api.Sensor("Temperature")  #TODO log user create to debug
    humidity_sensor_info = api.Sensor("Humidity")
    pressure_sensor_info = api.Sensor("Pressure")

    web_api = api.WebAPI(base_url=base_url,offline=offline)
    logging.info("TODO: This is a test") # TODO: Log info on Web API 
    temp_humidity = temp_humidity_sensor.TempAndHumiditySensor()
    pressure = pressure_sensor.PressureSensor()
    try:
        while True:
            time.sleep(3)
            if mock:
                logging.info("Logging a mock sensor output")
                web_api.send_data(user_info,temp_sensor_info,'{{"timestamp":{},"value":{}}}'.format(
                        datetime.now(pytz.timezone("Canada/Eastern")),420
                    ))
            else:
                if temp_humidity.read_from_sensor():
                    logging.debug("Tempature:{} , Humidity:{}".format(\
                        temp_humidity.tempVal,temp_humidity.humidityVal))
                    web_api.send_data(user_info,temp_sensor_info,"{{\"timestamp\":{},\"value\":{}}}".format(
                        datetime.now(pytz.timezone("Canada/Eastern")),temp_humidity.tempVal
                    ))
                    web_api.send_data(user_info,humidity_sensor_info,"{{\"timestamp\":{},\"value\":{}}}".format(
                        datetime.now(pytz.timezone("Canada/Eastern")),temp_humidity.humidityVal
                    ))
                else:
                    logging.warning("Status Error, please ensure deivce is working correctly")

                web_api.send_data(user_info,pressure_sensor_info,"{{\"timestamp\":{},\"value\":{}}}".format(
                        datetime.now(pytz.timezone("Canada/Eastern")),pressure.read_from_sensor()
                    ))
    except KeyboardInterrupt:
        #Leave system as expected
        pass
    finally:
        GPIO.cleanup()    
    return NotImplementedError
    



if __name__ == "__main__":
    init()
    # main()
    # cleanup()