#!/usr/local/bin/python
# Developed by: Robert Conrad 


import time 

# TODO: Move to a seperate managed package
def initialize_sensors():
    return NotImplementedError

# TODO: Move to a seperate managed package
def initialize_api_handler():
    return NotImplementedError

def initialize_modules():
    return NotImplementedError

def initialize_cycle(sensors,api):
    i = 1
    while True:
        time.sleep(10)
        print("Running loop %i",i)
        i += 1

def main():
    sensors = initialize_sensors()
    api = initialize_api_handler()
    modules = initialize_modules()
    if  (
        sensors == NotImplementedError or
        api    == NotImplementedError or
        modules == NotImplementedError
        ):
        print("System is not implemented to full functionality") 
    initialize_cycle(sensors,api)




if __name__ == "__main__":
    main()