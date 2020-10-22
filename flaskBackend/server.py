from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import json

import psycopg2

app = Flask(__name__)
bcrpyt = Bcrypt(app)
CORS(app)

#Configure db
conn = psycopg2.connect(user = "postgres", port="5432", host="database-1.cfa0og2dawpl.ca-central-1.rds.amazonaws.com", password = "capstone")
#conn = psycopg2.connect(dbname="capstone", port="5432")

#register register api
@app.route("/api/register", methods=['POST'])
def register():
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

#insert sensor data api
@app.route("/api/postSensorData", methods=['POST'])
def insertSensorData():
    jsonf = json.loads(request.get_json())
    print(jsonf)

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

#get sensor data api
@app.route("/api/getSensorDataTemperature", methods=['GET'])
def getSensorData():
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

#get sensor data api
@app.route("/api/getSensorDataPressure", methods=['GET'])
def getSensorDataPressure():
    #if request.method == "OPTIONS":
    #    print("Hello Preflight")
    #    return _build_cors_preflight_response()
    #elif request.method == "GET":
    #    print("Hello Actual Response")

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

#def _build_cors_preflight_response():
#    response = make_response()
#    response.headers.add("Access-Control-Allow-Origin", "*")
#    response.headers.add('Access-Control-Allow-Headers', "*")
#    response.headers.add('Access-Control-Allow-Methods', "*")
#    return response

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port=3001)