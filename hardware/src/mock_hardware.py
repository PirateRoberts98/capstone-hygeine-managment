#!/usr/local/bin/python3

#Local Imports
import api


# External Imports 
import time , argparse , yaml ,logging , sys ,  pytz 
from datetime import datetime

def create_arguments():
    text = '''
    This application is the middleware application for the CEG4912/3 Group 2 Capstone Project

    For more information, email rconr060@uottawa.ca 
    '''
    parser = argparse.ArgumentParser(description=text)
    parser.add_argument("--base_url", "-u", help="set the value of the base_url to a different value (default https://localhost:8080)")
    parser.add_argument("-M", "--mock", help="Run the application using mock sensor data ", action="store_true")
    parser.add_argument("-O", "--offline", help="Run the system offline (API Calls print to sysout)", action="store_true")
    return parser.parse_args()

def parse_config():
    with open('config.yaml') as f:
        return yaml.load(f, Loader=yaml.FullLoader)

def setup_logging(flag = logging.INFO , log_file ="debug.log" , sys_out=sys.stdout ):
    logging.basicConfig(
        level=flag,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler(sys_out)
        ]
    )   

def main():
    config = parse_config()
    args = create_arguments()  
    setup_logging()
    base_url= args.base_url if args.base_url else config["base_url"]
    mock = True if args.mock else config["mock"] 
    offline = True if args.offline else config["offline"]
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
                    time.mktime(datetime.now(pytz.timezone("Canada/Eastern")).timetuple()),19.0
                ))
            time.sleep(3)
            web_api.send_data(user_info,humidity_sensor_info,'{{"timestamp":{},"value":{}}}'.format(
                    time.mktime(datetime.now(pytz.timezone("Canada/Eastern")).timetuple()),0
                ))

    except KeyboardInterrupt:
        #Leave system as expected
        pass 




if __name__ == "__main__":
    main() 