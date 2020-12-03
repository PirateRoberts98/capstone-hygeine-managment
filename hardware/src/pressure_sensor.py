import  time
import RPi.GPIO as GPIO

class PressureSensor:
    GPIO_PIN = 4
    underPressure = 0
    count = 0
    def __init__(self,api_info):
        self.api_info = api_info
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(PressureSensor.GPIO_PIN, GPIO.IN)
        self.underPressure = self.read_from_sensor()
        self.count = 0
    
    def read_from_sensor(self):
        self.count = 0
    
        GPIO.setup(PressureSensor.GPIO_PIN, GPIO.OUT)
        GPIO.output(PressureSensor.GPIO_PIN, GPIO.LOW)
        time.sleep(0.5)
    
        GPIO.setup(PressureSensor.GPIO_PIN, GPIO.IN)
    
        while(GPIO.input(PressureSensor.GPIO_PIN) == GPIO.LOW):
            self.count += 1
        if(self.count >= 10000):
            self.underPressure = 0
        else:
            self.underPressure = 1
        return self.underPressure

def main():
    sensor = PressureSensor(None)
    try:
        while True:
            data = sensor.read_from_sensor()
            if(data == 1):
                print(sensor.count)
                print("Under Pressure")
            else:
                print(sensor.count)
                print("Not Under Pressure")
            time.sleep(0.3)
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()    

if __name__ == "__main__":
    main()

