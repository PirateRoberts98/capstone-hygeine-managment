import RPi.GPIO as GPIO
import  time


class TempAndHumiditySensor:
    GPIO_PIN = 17
    humidityVal = 0
    tempVal = 0
    dht_pulses = 41
    dht_max = 32000
    def __init__(self,temp_api_info,hum_api_info):
        self.temp_api_info = temp_api_info
        self.hum_api_info = hum_api_info
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(TempAndHumiditySensor.GPIO_PIN, GPIO.IN)
        self.read_from_sensor()
    
    def read_from_sensor(self):
        pulseCounts = [0]*self.dht_pulses*2
        count = 0
        threshold = 0
        data = [0] * 5
        index = 0
        status = 0
    
        GPIO.setup(TempAndHumiditySensor.GPIO_PIN, GPIO.OUT)
        GPIO.output(TempAndHumiditySensor.GPIO_PIN, GPIO.HIGH)
        time.sleep(0.5)
        GPIO.output(TempAndHumiditySensor.GPIO_PIN, GPIO.LOW)
        time.sleep(0.02)
       
        GPIO.setup(TempAndHumiditySensor.GPIO_PIN, GPIO.IN)
        for x in range(0,50):
            pass
        while(GPIO.input(TempAndHumiditySensor.GPIO_PIN) != GPIO.LOW):
            count+=1
            if(count >= self.dht_max):
                return status
    
        for x in range(0,self.dht_pulses*2,2):
            while(GPIO.input(TempAndHumiditySensor.GPIO_PIN) == GPIO.LOW):
                pulseCounts[x]+=1
                if(pulseCounts[x] >= self.dht_max):
                    return status
            while(GPIO.input(TempAndHumiditySensor.GPIO_PIN) == GPIO.HIGH):
                pulseCounts[x+1]+=1
                if(pulseCounts[x+1] >= self.dht_max):
                    return status
                
        for x in range(2,self.dht_pulses*2,2):
            threshold += pulseCounts[x]
        threshold = threshold//self.dht_pulses-1
    
        for x in range(3,self.dht_pulses*2, 2):
            index = (x-3)//16
            data[index] <<= 1
            if(pulseCounts[x] >= threshold):
                data[index] |= 1
        
        self.humidityVal = data[0]
        self.tempVal = data[2]
        status = 1
        return status


def main():
    sensor = TempAndHumiditySensor(None,None)
    try:
        while True:
            time.sleep(3)
            status = sensor.read_from_sensor()
            if(status == 1):
                print(sensor.humidityVal)
                print(sensor.tempVal)
            else:
                pass
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()    

if __name__ == "__main__":
    main()
