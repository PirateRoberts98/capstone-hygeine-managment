from flask import Flask, request
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

    print(isCaregiver)
    

    return {"value": True}

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port=3001)