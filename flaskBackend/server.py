from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import json
from validation import validate_data
from alarm import waterTemperature, humidityLevel, timesEntered

import psycopg2
import logging

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

#Configure db
#AWS
conn = psycopg2.connect(user = "postgres", port="5432", host="capstone.cfa0og2dawpl.ca-central-1.rds.amazonaws.com", password = "capstone")
#localhost
#conn = psycopg2.connect(dbname="capstone", port="5432")
#docker
#conn = psycopg2.connect(user="postgres", port="5432", host="localhost", password = "capstone", dbname = "capstone")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.FileHandler("serverapi.log"),logging.StreamHandler()]
)

#register register api
@app.route("/api/register", methods=['POST'])
def register():
    try:
        #parameters
        fname = request.get_json()['fname']
        lname = request.get_json()['lname']
        bday = request.get_json()['bday']
        gender = request.get_json()['gender']
        doctor = request.get_json()['doctor']
        isCaregiver = request.get_json()['isCaregiver']
        isPatient = request.get_json()['isPatient']
        isDeveloper = request.get_json()['isDeveloper']
        email = request.get_json()['email']
        password = bcrypt.generate_password_hash(request.get_json()['password1']).decode('utf-8') #encrypted

        cur = conn.cursor()
        cur.execute("INSERT INTO Users(fname, lname, bday, gender, doctor, iscaregiver, ispatient, isdeveloper, email, pw) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
         (fname, lname, bday, gender, doctor, isCaregiver, isPatient, isDeveloper, email, password))

        cur.execute("SELECT userid FROM users ORDER BY userid DESC LIMIT 1")
        row = cur.fetchone()

        conn.commit()
        cur.close()

        return {"userId": row[0]}
    except:
        raise Exception('ERROR POST SensorData')

#login api
@app.route("/api/login", methods=['POST'])
def login():
    try:
        #parameters
        email = request.get_json()['email']
        password = request.get_json()['password']

        cur = conn.cursor()
        cur.execute("SELECT userId, pw FROM Users WHERE email = %s", (email,))

        row = cur.fetchone()
        conn.commit()
        cur.close()

        data = {
            'userId': row[0],
            'passwordValid': bcrypt.check_password_hash(row[1], password)
        }

        return data
    except:
        raise Exception('ERROR POST SensorData')

#get user data api
@app.route("/api/getUserData", methods=['POST'])
def getUserData():
    try:
        #parameters
        if(request.get_json()['userId'] != 'Developer'):
            userId = request.get_json()['userId']

            cur = conn.cursor()
            cur.execute("SELECT userId, fname, lname, bday, gender, doctor, ispatient, iscaregiver, isdeveloper, email FROM Users WHERE userId = %s", (userId,))

            row = cur.fetchone()
            conn.commit()
            cur.close()

            data = {
                'userId': row[0],
                'fname': row[1],
                'lname': row[2],
                'bday': row[3],
                'gender': row[4],
                'doctor': row[5],
                'isPatient': row[6],
                'isCaregiver': row[7],
                'isDeveloper': row[8],
                'email': row[9]
            }

            return data
        else:
            return {'userId': "Devleoper", "isDeveloper": True}
    except:
        raise Exception('ERROR POST SensorData')

#insert sensor data api
@app.route("/api/postSensorData", methods=['POST'])
def insertSensorData():
    try:
        jsonf = json.loads(request.get_json())
        isValid = validate_data(jsonf)

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
                alarmOutput = waterTemperature(rows[i][4], rows[i][3])
                status = False
                message = None
                if alarmOutput:
                    status = alarmOutput["status"]
                    message = alarmOutput["message"]
                output.append({
                    "sensorId": rows[i][0],
                    "userId": rows[i][1],
                    "sensorType": rows[i][2],
                    "timestamp": rows[i][3],
                    "value": rows[i][4],
                    "status": status,
                    "message": message
                })

        response = jsonify(output[-25:])

        return response

    except:
        raise Exception('ERROR POST SensorData')

#get sensor data api
@app.route("/api/getSensorDataHumidity", methods=['GET'])
def getSensorDataHumidity():
    try:
        #sensorType = 'temp'

        cur = conn.cursor()
        cur.execute("SELECT * FROM datasensor WHERE sensortype = 'Humidity'")

        rows = cur.fetchall()

        cur.close()

        output = [] #new array to store our formatted data
        if rows:
            for i in range(len(rows)):
                alarmOutput = humidityLevel(rows[i][4])
                status = False
                message = None
                if alarmOutput:
                    status = alarmOutput["status"]
                    message = alarmOutput["message"]
                output.append({
                    "sensorId": rows[i][0],
                    "userId": rows[i][1],
                    "sensorType": rows[i][2],
                    "timestamp": rows[i][3],
                    "value": rows[i][4],
                    "status": status,
                    "message": message
                })

        response = jsonify(output[-25:])

        return response
    except:
        raise Exception('ERROR GET SensorDataTemperature')

#get sensor data api
@app.route("/api/getSensorDataPressure", methods=['GET'])
def getSensorDataPressure():
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM datasensor WHERE sensortype = 'Pressure'")

        rows = cur.fetchall()

        cur.close()

        output = [] #new array to store our formatted data
        if rows:
            for i in range(len(rows)):
                alarmOutput = timesEntered(rows[i][4], rows[i][3])
                status = False
                message = None
                if alarmOutput:
                    status = alarmOutput["status"]
                    message = alarmOutput["message"]
                output.append({
                    "sensorId": rows[i][0],
                    "userId": rows[i][1],
                    "sensorType": rows[i][2],
                    "timestamp": rows[i][3],
                    "value": rows[i][4],
                    "status": status,
                    "message": message
                })

        response = jsonify(output[-25:])
    #    response.headers.add("Access-Control-Allow-Origin", "*")

        return response
    except:
        raise Exception('Error GET sensorDataPressure')

#post message api
@app.route("/api/postMessage", methods=['POST'])
def postMessage():
    try:
        senderId = request.get_json()['senderId']
        receiverId = request.get_json()['receiverId']
        message = request.get_json()['message']

        cur = conn.cursor()
        cur.execute("INSERT INTO messages(senderId, receiverId, messageValue) VALUES (%s, %s, %s)", (senderId, receiverId, message))

        conn.commit()
        cur.close()

        return {"value": True}
    except:
        raise Exception('Error POST postMessage')

#get message api
@app.route("/api/getMessages/<receiverId>", methods=['GET'])
def getMessages(receiverId):
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM messages WHERE receiverId = %s", (receiverId))

        rows = cur.fetchall()
        conn.commit()
        cur.close()

        output = [] #new array to store our formatted data
        if rows:
            for i in range(len(rows)):
                output.append({
                    "messageId": rows[i][0],
                    "senderId": rows[i][1],
                    "receiverId": rows[i][2],
                    "message": rows[i][3]
                })

        response = jsonify(output)
        return response
    except:
        raise Exception('Error POST postMessage')

#def _build_cors_preflight_response():
#    response = make_response()
#    response.headers.add("Access-Control-Allow-Origin", "*")
#    response.headers.add('Access-Control-Allow-Headers', "*")
#    response.headers.add('Access-Control-Allow-Methods', "*")
#    return response

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port=3001)
