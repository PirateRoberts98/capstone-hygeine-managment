#!/usr/local/bin/python3

#Local Imports
import api

import temp_humidity_sensor
import pressure_sensor
import config
import RPi.GPIO as GPIO

# External Imports 
import time , argparse , yaml ,logging , sys ,  pytz 
from datetime import datetime



def main():
    configuration = config.parse_config()
    args = config.create_arguments()  
    config.setup_logging()
    base_url= args.base_url if args.base_url else configuration["base_url"]
    mock = True if args.mock else configuration["mock"] 
    offline = True if args.offline else configuration["offline"]
    # TODO Log the config state to debug 
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




if __name__ == "__main__":
    main() 