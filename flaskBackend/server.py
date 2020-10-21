from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt

import psycopg2

app = Flask(__name__)
bcrpyt = Bcrypt(app)
CORS(app)

#Configure db
conn = psycopg2.connect(dbname="capstone", port="5432")

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
    #sensorId = -1
    #userId = -1
    #deviceId = "test"
    #sensorType = "temp"
    #timestamp = "03-01-2019"
    #value = 420

    sensorId = request.get_json()['sensor']["id"]
    userId = request.get_json()["user"]["id"]
    deviceId = request.get_json()['device_id']
    sensorType = request.get_json()['sensor']["type"]
    timestamp = request.get_json()["data"]["timestamp"]
    value = request.get_json()['data']["value"]

    cur = conn.cursor()
    cur.execute("INSERT INTO sensorData(sensorId, userId, deviceId, sensorType, tStamp, val) VALUES (%s, %s, %s, %s, %s, %s)", (sensorId, userId, deviceId, sensorType, timestamp, value))

    conn.commit()

    cur.close()

    return {"value": True}

#get sensor data api
@app.route("/api/getSensorData", methods=['POST'])
def getSensorData():
    #sensorType = 'temp'
    sensorType = request.get_json()['type']

    cur = conn.cursor()
    cur.execute("SELECT * FROM sensorData WHERE sensortype = %s", (sensorType,))

    rows = cur.fetchall()

    cur.close()

    output = [] #new array to store our formatted data
    if rows:
        for i in range(len(rows)):
            output.append({
                "sensorId": rows[i][0],
                "userId": rows[i][1],
                "deviceId": rows[i][2],
                "sensorType": rows[i][3],
                "timestamp": rows[i][4],
                "value": rows[i][5]
            })

    return jsonify(output)

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port=3001)