import json

def validate_data(obj):
    try:
        print('start')
        output = {
            'status' : 201,
            'msg' : None
        }

        #validating device id
        #if 'device_id' in self.obj:
        #    if type(self.obj['device_id']) is str:
        #        output['msg'] =  'Validated'
        #    else:
        #        output['status'] = 404
        #        output['msg'] = 'Fail vaildation'      
        #else:
        #    output['status'] = 404
        #    output['msg'] = 'Fail vaildation'

        #validating time stemp
        if 'timestamp' in obj:
            print('timestamp')
            if type(obj['timestamp']) is str:
                print('type')
                output['msg'] =  'Validated'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'   
        else:
            output['status'] = 404
            output['msg'] = 'Fail vaildation'

        #validating user
        if 'user' in obj:
            print('user')
            if 'id' in obj['user']:
                print('in')
                if type(obj['user']['id']) is str:
                    print('type')
                    output['msg'] = 'Validated'
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'
        else:
            output['status'] = 404
            output['msg'] = 'Fail vaildation'

        
        #validating sensor
        if 'sensor' in obj:
            print('sensor')
            if 'type' in obj['sensor']: 
                print('in')
                if type(obj['sensor']['type']) is str: 
                    print('type')
                    output['msg'] = 'Validated' 
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'
        else:
            output['status'] = 404
            output['msg'] = 'Fail vaildation'

        #validating data
        if 'data' in obj:
            print('data')
            if 'timestamp' in obj['data'] and 'value' in obj['data']:
                print('timestamp')
                if type(obj['data']['timestamp']) is str:
                    print('type')
                    if obj['sensor']['type'] == 'Humidity':
                        print('sensor type')
                        temp = int(obj['data']['value'])
                        if temp > 0:
                            print('>')
                            output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    elif obj['sensor']['type'] == 'Temperature':  
                        print('sensor type')
                        temp = int(obj['data']['value'])
                        if temp > 0:
                            print('>')
                            output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    elif obj['sensor']['type'] == 'Pressure': 
                        print('sensor type') 
                        if obj['data']['value'] is True or obj['data']['value'] is False:
                            print('is')
                            output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    else:
                        output['status'] = 404
                        output['msg'] = 'Fail vaildation'
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'
        else:
            output['status'] = 404
            output['msg'] = 'Fail vaildation'

        resp = json.dumps(output)
        return resp
    except:
        print("test")
        raise Exception('ERROR POST SensorData')





