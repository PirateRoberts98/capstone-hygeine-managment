from flask import Flask, request ,  json
import logging
logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler("server_Test.log"),
            logging.StreamHandler()
        ]
    )  


companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

@api.route('/sensor', methods=['GET'])
def get_sensor():
    print(request.data, flush=True)
    return json.dumps(companies)

@api.route('/api/postSensorData', methods=['POST'])
def post_sensor():
    print(request.data, flush=True)
    return json.dumps({"success": True}), 201

@api.route('/alert', methods=['GET'])
def get_alert():
    print(request.data, flush=True)
    return json.dumps(companies)

@api.route('/alert', methods=['POST'])
def post_alert():
    print(request.data, flush=True)
    return json.dumps({"success": True}), 201

if __name__ == '__main__':
    api.run()