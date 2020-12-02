import sys
import pandas as pd

import pressure_sensor as pressure

def createTraining():
    df = pd.DataFrame(columns=['PressureVal', 'Type'])
    populating = True
    pressureVal = 0
    sensor = pressure.PressureSensor(None)
    
    while(populating):
        option = input("What are you populating the database with? (1 = User, 2 = Non-user, 3 = Abscence of input, 4 = Quit): ")
        if(option == "4"):
            populating = False
        else:
            for i in range(10):
                sensor.read_from_sensor()
                pressureVal = sensor.count
                df = df.append({'PressureVal':pressureVal, 'Type':option}, ignore_index=True)
    df.to_csv('training.csv')
                
def main():
    createTraining()


if __name__ == "__main__":
    main()