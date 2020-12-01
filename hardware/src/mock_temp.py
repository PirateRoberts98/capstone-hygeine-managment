import  time
import  random
import  math

class TempAndHumiditySensor:
    humidityVal = 50
    tempVal = 21
    randCount = 0
    randPeriod = 25
    transitionCount = 0
    transitionState = 0
    sinCount = 0
    def __init__(self,temp_api_info,hum_api_info, mode=0):
        self.temp_api_info = temp_api_info
        self.hum_api_info = hum_api_info
        self.mode = mode
        self.read_from_sensor()
    
    def read_from_sensor(self):
        if(self.mode == 0):
            self.flatLineMinMock()
        elif(self.mode == 1):
            self.flatLineMaxMock()
        elif(self.mode == 2):
            self.flatLineMidMock()
        elif(self.mode == 3):
            self.randomEdgedMock()
        elif(self.mode == 4):
            self.randomMock()
        elif(self.mode == 5):
            self.sinusoidMock()
        
        return


    def flatLineMinMock(self):
        self.tempVal = 16
        self.humidityVal = 20
        return
    
    def flatLineMaxMock(self):
        self.tempVal = 25
        self.humidityVal = 80
        return
    
    def flatLineMidMock(self):
        self.tempVal = 21
        self.humidityVal = 50
        return
    
    def randomEdgedMock(self):
        #transition to high, low, or medium temp/humidity
        #10 cycles to transition temps
        if(self.transitionCount<10):
            self.transitionCount+=1
            #transition to hot
            if(self.transitionState == 0):
                self.tempVal+=(26-self.tempVal)/(11-self.transitionCount)
                self.humidityVal+=(80-self.humidityVal)/(11-(self.transitionCount))
            #transition to cold
            elif(self.transitionState == 1):
                self.tempVal+=(16-self.tempVal)/(11-self.transitionCount)
                self.humidityVal+=(20-self.humidityVal)/(11-(self.transitionCount))
            #transition to "room temp"
            elif(self.transitionState == 2):
                self.tempVal+=(21-self.tempVal)/(11-self.transitionCount)
                self.humidityVal+=(50-self.humidityVal)/(11-(self.transitionCount))                        
        else:
            self.transitionState = random.randrange(3)
            self.transitionCount = 0
        return
    
    def randomMock(self):
        randomInt = random.randrange(10)
        self.tempVal = 16 + randomInt
        self.humidityVal = 20 + (7*randomInt)
        return
    
    def sinusoidMock(self):
        if(self.sinCount >= 125):
            self.sinCount = 0
        self.tempVal = 21 + (5*math.sin(self.sinCount))
        self.humidityVal = 50 + (35*math.sin(self.sinCount))
        self.sinCount+=1
        return
    
    
def main():
    sensor = TempAndHumiditySensor(None,None,mode=3)
    try:
        while True:
            time.sleep(1)
            sensor.read_from_sensor()
            print(sensor.tempVal)
            print(sensor.humidityVal)
    except KeyboardInterrupt:
        pass 

if __name__ == "__main__":
    main()

