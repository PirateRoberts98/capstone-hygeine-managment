import  time
import RPi.GPIO as GPIO

class PressureSensor:
    GPIO_PIN = 4
    underPressure = 0
    def __init__(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(PressureSensor.GPIO_PIN, GPIO.IN)
        self.underPressure = self.read_from_sensor()
    
    def read_from_sensor(self):
        count = 0
    
        GPIO.setup(PressureSensor.GPIO_PIN, GPIO.OUT)
        GPIO.output(PressureSensor.GPIO_PIN, GPIO.LOW)
        time.sleep(0.5)
    
        GPIO.setup(PressureSensor.GPIO_PIN, GPIO.IN)
    
        while(GPIO.input(PressureSensor.GPIO_PIN) == GPIO.LOW):
            count += 1
        if(count >= 10000):
            self.underPressure = 0
        else:
            self.underPressure = 1
        return self.underPressure

def main():
    sensor = PressureSensor()
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
    finally:
        GPIO.cleanup()    

main()

