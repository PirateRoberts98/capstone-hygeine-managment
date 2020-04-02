
import os 

class TempatureSensor:
    ds18b20 = ""

    def __init__(self):
        self.setup()
        return 


    def setup(self):
        for i in os.listdir('/sys/bus/w1/devices'):
            if i != 'w1_bus_master1':
                TempatureSensor.ds18b20 = i

    def read_sensor(self):
        location = '/sys/bus/w1/devices/' + TempatureSensor.ds18b20 + '/w1_slave'
        tfile = open(location)
        text = tfile.read()
        tfile.close()
        secondline = text.split("\n")[1]
        temperaturedata = secondline.split(" ")[9]
        temperature = float(temperaturedata[2:])
        temperature = temperature / 1000
        return temperature