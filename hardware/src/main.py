#!/usr/local/bin/python3

# External Imports 
import time


import sensors.pressure_sensor as pressure
import sensors.tempature_sensor as temp 
def init_sensors():
    pressure.initialize_sensor_platform()
    p_sensor = pressure.PressureSensor()
    t_sensor = temp.TempatureSensor()
    return {"pressure":p_sensor,"tempature":t_sensor}

def cleanup_sensors():
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
def init_api(base_uri="localhost:5000"):
    alert_handler = a_api.AlertHandler(base_uri)
    pressure_handler = p_api.PressureHandler(base_uri)
    tempature_handler = t_api.TempatureHandler(base_uri)
    return {"alert":alert_handler,"pressure":pressure_handler,"tempature":tempature_handler}


def main():
    try:

        # Initialize the handlers for alert and sensor
        apis = init_api()
        modules = init_modules(apis["alert"])
        sensors = init_sensors()
        initialize_cycle(
            sensors["pressure"],sensors["tempature"],
            modules["alert"], modules["verify"],
            apis["alert"],apis["pressure"],apis["tempature"]
            )
    except KeyboardInterrupt:
        cleanup_sensors()


def initialize_cycle(p_sensor, t_sensor , a_module , v_module , api_alert, api_pressure, api_tempature):
    i = 1
    while True:
        time.sleep(10)
        print("Running loop %i",i)
        i += 1
        value = pressure.read_from_sensor()
        #TODO: check value on module
        if False:
            alert_handler.add_alert(True)
        sensor_handler.add_sensor_data(value)

if __name__ == "__main__":
    main()