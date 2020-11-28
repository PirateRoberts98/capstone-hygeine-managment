#!/usr/local/bin/python3
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