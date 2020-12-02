import sys
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np

import pressure_sensor as pressure

def createTraining():
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
                
def trainSensor():
    X = pd.read_csv("training.csv")
    y = X.pop("Type").values
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size = 0.1, random_state=2)
    clf_nb = MultinomialNB().fit(X_train, y_train)
    clf_lr = LogisticRegression(solver = 'lbfgs', max_iter=1000, random_state=1).fit(X_train, y_train)
    nb_val_predictions = clf_nb.predict(X_val)    
    lr_val_predictions = clf_lr.predict(X_val)
    print(y_val)
    print(nb_val_predictions)
    print("Naive Bayes Accuracy:")
    print(accuracy(y_val, nb_val_predictions))
    print("Linear Regression Accuracy:")
    print(accuracy(y_val, lr_val_predictions))


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
    createTraining()
    trainSensor()


if __name__ == "__main__":
    main()