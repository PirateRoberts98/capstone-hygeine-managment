import json

def validate_data(obj):
    try:
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
            if type(obj['timestamp']) is str:
                output['msg'] =  'Validated'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'   
        else:
            output['status'] = 404
            output['msg'] = 'Fail vaildation'

        #validating user
        if 'user' in obj:
            if 'id' in obj['user'] and 'name' in obj['user']:
                if type(obj['user']['name']) is str:
                    temp = int(obj['user']['id'])
                    if temp > 0:
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

        
        #validating sensor
        if 'sensor' in obj:
            if 'id' in obj['sensor'] and 'type' in obj['sensor']: 
                if type(obj['sensor']['type']) is str: 
                    temp = int(obj['sensor']['id'])
                    if temp > 0:
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

        #validating data
        if 'data' in obj:
            if 'timestamp' in obj['data'] and 'value' in obj['data']:
                if type(obj['data']['timestamp']) is str:
                    if obj['sensor']['type'] == 'Humidity':
                        temp = int(obj['data']['value'])
                        if temp > 0:
                            output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    elif obj['sensor']['type'] == 'Temperature':  
                        if temp > 0:
                            output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    elif obj['sensor']['type'] == 'Pressure':  
                        if obj['data']['value'] is 'true' or obj['data']['value'] is 'false':
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



