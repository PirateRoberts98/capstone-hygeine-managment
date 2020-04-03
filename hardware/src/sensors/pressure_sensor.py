
import time

try:
    import RPi.GPIO as GPIO
except ImportError:
    TEST = True


def initialize_sensor_platform():
    if TEST :
        PressureSensor.platform_enable = False
        return 
    GPIO.setmode(GPIO.BCM)
    PressureSensor.platform_enable = True


def cleanup_sensor_platform():
    if TEST :
        PressureSensor.platform_enable = False
        return 
    GPIO.cleanup()
    PressureSensor.platform_enable = False


class PressureSensor:
    platform_enable = False
    GPIO_PIN = 4
    def __init__(self,mock):
        self.mock = mock
        if not self.mock and not PressureSensor.platform_enable:
            print("Error setting up pressure enviroment, might not work as expected")
            self.mock = True

        if self.mock :
            #Default the value of status 
            self.status = False 
        else:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(PressureSensor.GPIO_PIN ,GPIO.IN)
            self.test = False # If platoform is not enabled, run as test sensor
            self.status = self.read_from_sensor()


    def read_from_sensor(self):
        if  self.mock:
            self.status = not self.status
        else:
            self.status = GPIO.input(PressureSensor.GPIO_PIN)
        return self.status      

def main():
    initialize_sensor_platform()
    cleanup_sensor_platform()
    sensor = PressureSensor(True)
    try:    
        while True:
            #take a reading
            
            input = sensor.read_from_sensor()
            if (input==1):
                print("Under Pressure")
            else:
                print("not under pressure")
            #slight pause
            time.sleep(0.30)
    except KeyboardInterrupt:
        pass
    finally:
        cleanup_sensor_platform()

if __name__ == "__main__":
    main()
    