import  time
import  random

class MockPressureSensor:
    underPressure = 0
    mode = 0
    randCount = 0
    randPeriod = 25
    def __init__(self, mode, randPeriod):
        self.mode = mode
        self.randPeriod = randPeriod
        self.read_from_sensor()
    
    def read_from_sensor(self):
        if(self.mode == 0):
            self.flatLineMinMock()
        elif(self.mode == 1):
            self.flatLineMaxMock()
        elif(self.mode == 2):
            self.randomEdgedMock()
        elif(self.mode == 3):
            self.randomMock()
        
        return self.underPressure

    def flatLineMinMock(self):
        self.underPressure = 0
        return
    
    def flatLineMaxMock(self):
        self.underPressure = 1
        return
    
    def randomEdgedMock(self):
        self.randCount+=1
        if(self.randCount>=self.randPeriod):
            self.randCount = 0
            if(random.randrange(2) == 1):
                if(self.underPressure == 1):
                    self.underPressure = 0
                else:
                    self.underPressure = 1
        return
    
    def randomMock(self):
        if(random.randrange(2) == 1):
            if(self.underPressure == 1):
                self.underPressure = 0
            else:
                self.underPressure = 1
        return
    
def main():
    sensor = MockPressureSensor(2, 25)
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


