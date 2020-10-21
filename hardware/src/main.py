#!/usr/local/bin/python3

#Local Imports
import api


# External Imports 
import time , argparse , yaml ,logging , sys


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
    logging.debug('This message should go to the log file')
    logging.info('So should this')
    logging.warning('And this, too')
    logging.error('And non-ASCII stuff, too, like Øresund and Malmö')
    base_url= args.base_url if args.base_url else config["base_url"]
    mock = True if args.mock else config["mock"] 
    offline = True if args.offline else config["offline"]

    user_info = api.User("foo")
    sensor_info = api.Sensor("Humidity")
    web_api = api.WebAPI(offline=True)
    web_api.send_data(user_info,sensor_info,"{value:Init}")
    while True:
        time.sleep(5)
        web_api.send_data(user_info,sensor_info,"{Test:True}")



if __name__ == "__main__":
    main() 