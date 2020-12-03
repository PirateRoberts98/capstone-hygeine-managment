import sys
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np

import pressure_sensor as pressure

class aiModule:
    def init(self):
        self.clf_nb = None
        self.clf_lr = None
        self.nb_val_predictions = None
        self.lr_val_predictions = None

    def createTraining(self):
        df = pd.DataFrame(columns=['PressureVal', 'Type'])
        populating = True
        pressureVal = 0
        sensor = pressure.PressureSensor(None)
    
        while(populating):
            option = input("What are you populating the database with? (0 = Non-User, 1 = User, 2 = Quit): ")
            if(option == "2"):
                populating = False
            else:
                for i in range(10):
                    sensor.read_from_sensor()
                    pressureVal = sensor.count
                    df = df.append({'PressureVal':pressureVal, 'Type':option}, ignore_index=True)
        df.to_csv('training.csv')
                
    def trainSensor(self):
        X = pd.read_csv("training.csv")
        featureSet = ['PressureVal']
        y = X.pop("Type").values
        X = X[featureSet].copy()
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size = 0.1, random_state=2)
        self.clf_nb = MultinomialNB().fit(X_train, y_train)
        self.clf_lr = LogisticRegression(solver = 'lbfgs', max_iter=1000, random_state=1).fit(X_train, y_train)
        self.nb_val_predictions = self.clf_nb.predict(X_val)    
        self.lr_val_predictions = self.clf_lr.predict(X_val)
        print(X_val)
        print(self.nb_val_predictions)
        print("Naive Bayes Accuracy:")
        print(accuracy(y_val, self.nb_val_predictions))
        print("Linear Regression Accuracy:")
        print(accuracy(y_val, self.lr_val_predictions))

    def predict(self,queue):
        newQueue = np.array(queue)
        newQueue = newQueue.reshape(-1,1)
        self.nb_val_predictions = self.clf_nb.predict(newQueue)    
        self.lr_val_predictions = self.clf_lr.predict(newQueue)
        return self.lr_val_predictions

def precision(actualTags, predictions, classOfInterest):
    totalFound = 0
    for i in range(len(actualTags)):
        if (actualTags[i] == classOfInterest and actualTags[i] == predictions[i]):
            totalFound += 1
    return totalFound / np.count_nonzero(predictions == classOfInterest)

def recall(actualTags, predictions, classOfInterest):
    totalFound = 0
    for i in range(len(actualTags)):
        if (actualTags[i] == classOfInterest and actualTags[i] == predictions[i]):
            totalFound += 1
    return totalFound / np.count_nonzero(actualTags == classOfInterest)

def accuracy(actualTags, predictions):
    totalFound = 0
    for i in range(len(actualTags)):
        if (actualTags[i] == predictions[i]):
            totalFound += 1
    return totalFound / len(predictions)

def main():
    test = aiModule()
    sensor = pressure.PressureSensor(None)
    test.createTraining()
    test.trainSensor()
    while(True):
        option = input("Test: ")
        sensor.read_from_sensor()
        print(test.predict(sensor.count))
    


if __name__ == "__main__":
    main()