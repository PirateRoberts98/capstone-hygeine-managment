import time, threading


class Sensor_1:
    def __init__(self):
        return

    def read(self,delay,function):
        threading.Timer(delay,function,args=[delay,function]).start()
        print(time.ctime())
        print("bart")

class Sensor_2:
    def __init__(self):
        return

    def read(self,delay,function):
        threading.Timer(delay,function,args=[delay,function]).start()
        print(time.ctime())
        print("foob")

    
def sensor_1(delay,function):
    threading.Timer(delay,function,args=[delay,function]).start()
    print(time.ctime())
    print("bar")

def sensor_2(delay,function):
    threading.Timer(delay,function,args=[delay,function]).start()
    print(time.ctime())
    print("foo")

sensor_a =  Sensor_1()
sensor_b =  Sensor_2()

hardware_schedule_table = (
    (5,sensor_a.read),
    (3,sensor_b.read)
)

def main():
    for sensors in hardware_schedule_table:
        sensors[1](sensors[0],sensors[1])
    while True:
        time.sleep(0.1) # Perpectual Loop 


if __name__ == "__main__":
    main()

