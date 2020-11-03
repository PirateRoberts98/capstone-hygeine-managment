from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import json

import psycopg2

app = Flask(__name__)
bcrpyt = Bcrypt(app)
CORS(app)

#Configure db
#AWS
#conn = psycopg2.connect(user = "postgres", port="5432", host="database-1.cfa0og2dawpl.ca-central-1.rds.amazonaws.com", password = "capstone")
#localhost
conn = psycopg2.connect(dbname="capstone", port="5432")
#docker
#conn = psycopg2.connect(user="postgres", port="5432", host="localhost", password = "capstone", dbname = "capstone")

#register register api
@app.route("/api/register", methods=['POST'])
def register():
    try:
        email = request.get_json()['email']
        password = bcrpyt.generate_password_hash(request.get_json()['password1']).decode('utf-8') #encrypted
        fname = request.get_json()['fname']
        lname = request.get_json()['lname']
        bday = request.get_json()['bday']
        gender = request.get_json()['gender']
        doctor = request.get_json()['doctor']
        isCaregiver = request.get_json()['isCaregiver']

        cur = conn.cursor()
        cur.execute("INSERT INTO Users(fname, lname, email, doctor, bday, gender, pw, iscaregiver) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (fname, lname, email, doctor, bday, gender, password, isCaregiver))

        conn.commit()
        cur.close()

        return {"value": True}
    except:
        raise Exception('ERROR POST SensorData')

#insert sensor data api
@app.route("/api/postSensorData", methods=['POST'])
def insertSensorData():
    try:
        jsonf = json.loads(request.get_json())

        sensorId = 1
        userId = jsonf["user"]["id"]
        sensorType = jsonf['sensor']["type"]
        timestamp = jsonf["data"]["timestamp"]
        value = jsonf['data']["value"]

        cur = conn.cursor()

        cur.execute("INSERT INTO dataSensor(sensorId, userId, sensorType, tStamp, val) VALUES (%s, %s, %s, %s, %s)", (sensorId, userId, sensorType, timestamp, value))

        conn.commit()

        cur.close()
        return {"value": True}

    except:
        raise Exception('ERROR POST SensorData')

#get sensor data api
@app.route("/api/getSensorDataTemperature", methods=['GET'])
def getSensorDataTemperature():
    try:
        #sensorType = 'temp'

        cur = conn.cursor()
        cur.execute("SELECT * FROM datasensor WHERE sensortype = 'Temperature'")

        rows = cur.fetchall()

        cur.close()

        output = [] #new array to store our formatted data
        if rows:
            for i in range(len(rows)):
                output.append({
                    "sensorId": rows[i][0],
                    "userId": rows[i][1],
                    "sensorType": rows[i][2],
                    "timestamp": rows[i][3],
                    "value": rows[i][4]
                })

        response = jsonify(output)

        return response
    except:
        raise Exception('ERROR GET SensorDataTemperature')

#get sensor data api
@app.route("/api/getSensorDataPressure", methods=['GET'])
def getSensorDataPressure():
    #if request.method == "OPTIONS":
    #    print("Hello Preflight")
    #    return _build_cors_preflight_response()
    #elif request.method == "GET":
    #    print("Hello Actual Response")
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM datasensor WHERE sensortype = 'Pressure'")

        rows = cur.fetchall()

        cur.close()

        output = [] #new array to store our formatted data
        if rows:
            for i in range(len(rows)):
                output.append({
                    "sensorId": rows[i][0],
                    "userId": rows[i][1],
                    "sensorType": rows[i][2],
                    "timestamp": rows[i][3],
                    "value": rows[i][4]
                })

        response = jsonify(output)
    #    response.headers.add("Access-Control-Allow-Origin", "*")

        return response
    except:
        raise Exception('Error GET sensorDataPressure')

#def _build_cors_preflight_response():
#    response = make_response()
#    response.headers.add("Access-Control-Allow-Origin", "*")
#    response.headers.add('Access-Control-Allow-Headers', "*")
#    response.headers.add('Access-Control-Allow-Methods', "*")
#    return response

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port=3001)