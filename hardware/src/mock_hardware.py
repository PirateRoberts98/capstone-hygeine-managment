#!/usr/local/bin/python3

#Local Imports
import api
import config

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
    # TODO: Log info on Web API 
    try:
        while True:
            time.sleep(3)
            logging.info("Logging a mock sensor output")
            web_api.send_data(user_info,temp_sensor_info,'{{"timestamp":{},"value":{}}}'.format(
                    time.time(),19.0
                ))
            web_api.send_data(user_info,humidity_sensor_info,'{{"timestamp":{},"value":{}}}'.format(
                    time.time(),0
                ))

    except KeyboardInterrupt:
        #Leave system as expected
        pass 




if __name__ == "__main__":
    main() 