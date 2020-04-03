
import os 
import random 

class TempatureSensor:
    ds18b20 = ""

    def __init__(self,mock):
        self.mock = mock
        if not mock:
            self.setup()
        else:
            self.value = 15.0
            self.increase_factor = 1
        return 


    def setup(self):
        for i in os.listdir('/sys/bus/w1/devices'):
            if i != 'w1_bus_master1':
                TempatureSensor.ds18b20 = i

    def read_sensor(self):
        if self.mock:
            self.value = self.value + (self.increase_factor*random.random())
            if self.value > 30.0 or self.value < 10.0:
                self.increase_factor = -1*self.increase_factor 
            temperature = self.value
        else:
            location = '/sys/bus/w1/devices/' + TempatureSensor.ds18b20 + '/w1_slave'
            tfile = open(location)
            text = tfile.read()
            tfile.close()
            secondline = text.split("\n")[1]
            temperaturedata = secondline.split(" ")[9]
            temperature = float(temperaturedata[2:])
            temperature = temperature / 1000
        return temperature