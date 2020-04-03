#!/usr/local/bin/python3

# External Imports 
import time


import sensors.pressure_sensor as pressure
import sensors.tempature_sensor as temp 
def init_sensors(test_mode):
    if not test_mode:
        pressure.initialize_sensor_platform()
    p_sensor = pressure.PressureSensor(test_mode)
    t_sensor = temp.TempatureSensor(test_mode)
    return {"pressure":p_sensor,"tempature":t_sensor}

def cleanup_sensors(test_mode):
    if not test_mode:
        pressure.cleanup_sensor_platform() 
    return 

import modules.alert_module as alert 
import modules.validation_module as valid
def init_modules(api, buffer_size=20):
    a_module = alert.AlertModule(buffer_size,api)
    s_module = valid.SystemValidate(api)
    return {"alert":a_module,"validate":s_module}

import api.alert_api as a_api
import api.pressure_api as p_api
import api.tempature_api as t_api
def init_api(base_uri, offline_mode):
    alert_handler = a_api.AlertHandler(base_uri,offline=offline_mode)
    pressure_handler = p_api.PressureHandler(base_uri,offline=offline_mode)
    tempature_handler = t_api.TempatureHandler(base_uri,offline=offline_mode)
    return {"alert":alert_handler,"pressure":pressure_handler,"tempature":tempature_handler}

import argparse
def create_arguments():
    text = '''
    This application is the middleware application for the CEG4912 Group 2 Capstone Project

    For more information, email rconr060@uottawa.ca 
    '''
    parser = argparse.ArgumentParser(description=text)
    parser.add_argument("--base_url", "-u", help="set the value of the base_url to a different value (default https://localhost:8080)")
    parser.add_argument("--local_buffer", "-b", help="set the local bugger that modules use for data analysis without GET requests")
    parser.add_argument("-M", "--mock", help="Run the application using mock sensor data ", action="store_true")
    parser.add_argument("-O", "--offline", help="Run the system offline (API Calls print to sysout)", action="store_true")
    return parser.parse_args()


def main():

    args = create_arguments()  
    base_url= args.base_url if args.base_url else "https://localhost:8080"
    local_buffer = args.local_buffer if args.local_buffer else 20
    test_mode = True if args.mock else False #Hardcode bool to remove object
    offline_mode = True if args.offline else False
    try:

        # Initialize the handlers for alert and sensor
        apis = init_api(base_url, offline_mode)
        modules = init_modules(apis["alert"])
        sensors = init_sensors(test_mode)
        initialize_cycle(
            sensors["pressure"],sensors["tempature"],
            modules["alert"], modules["validate"],
            apis["alert"],apis["pressure"],apis["tempature"]
            )
    except KeyboardInterrupt:
        cleanup_sensors(test_mode)


def initialize_cycle(p_sensor, t_sensor , a_module , v_module , api_alert, api_pressure, api_tempature):
    i = 1
    while True:
        print("Running loop %i",i)
        i += 1
        p_data = p_sensor.read_from_sensor()
        a_module.check_data_value(p_data)
        v_module.validate_pressure(p_data)
        t_data = t_sensor.read_sensor()
        v_module.validate_tempature(t_data)
        api_pressure.add_sensor_data(p_data)
        api_tempature.add_sensor_data(t_data)
        time.sleep(5)

if __name__ == "__main__":
    main()