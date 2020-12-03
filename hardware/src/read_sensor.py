import  time
import board
import busio

import adafruit_mpr121

class ReadSensor:
    def __init__(self,pin,api_info,addr=90):
        self.api_info = api_info
        self.pin = pin
        self.i2c = busio.I2C(board.SCL, board.SDA)
        self.buffer = bytearray(2)
        self.addr = addr
        mpr121 = adafruit_mpr121.MPR121(self.i2c)
        self.touched = self.read_from_sensor()
    
    def read_from_sensor(self):
        self.touched = 0
        self.i2c.readfrom_into(90, self.buffer)
        value = self.buffer[1] << 8 | self.buffer[0]
        if(value & (1 << (self.pin))):
           self.touched = 1
        
        
        return self.touched

def main():
    sensor = ReadSensor(0,None)
    try:
        while True:
            data = sensor.read_from_sensor()
            if(data == 1):
                print("Under Pressure")
            else:
                print("Not Under Pressure")
            time.sleep(0.3)
    except KeyboardINterrupt:
        pass

if __name__ == "__main__":
    main()


