#!/usr/local/bin/python
# Developed by: Robert Conrad 


import time
import api_call
import pressure_sensor

# TODO: Move to a seperate managed package
def initialize_sensors():
    return NotImplementedError

# TODO: Move to a seperate managed package
def initialize_api_handler():
    return NotImplementedError

def initialize_modules():
    return NotImplementedError

def initialize_cycle(pressure,alert_handler,sensor_handler):
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


def main():
    try:
        pressure_sensor.initialize_sensor_platform()
        pressure = pressure_sensor.PressureSensor()
        # Initialize the handlers for alert and sensor
        base_uri = "localhost:5000"
        alert_handler = api_call.AlertHandler(base_uri)
        sensor_handler = api_call.SensorHandler(base_uri)
        modules = initialize_modules()
        if  (
            modules == NotImplementedError
            ):
            print("System is not implemented to full functionality") 
        initialize_cycle(pressure,alert_handler,sensor_handler)
    except KeyboardInterrupt:
        pressure_sensor.cleanup_sensor_platform()

if __name__ == "__main__":
    main()