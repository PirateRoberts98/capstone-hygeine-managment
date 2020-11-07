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
            #    if output['status'] == 201:
        #           output['msg'] =  'Validated'
        #    else:
        #        output['status'] = 404
        #        output['msg'] = 'Fail vaildation'      
        #else:
        #    output['status'] = 404
        #    output['msg'] = 'Fail vaildation'

        #validating time stemp
       # if 'timestamp' in obj:
       #     print('timestamp')
       #     if type(obj['timestamp']) is str:
       #         print('type')
               # if output['status'] == 201:
       #            output['msg'] =  'Validated'
       #     else:
       #         output['status'] = 404
       #         output['msg'] = 'Fail vaildation'   
       # else:
        #    output['status'] = 404
        #    output['msg'] = 'Fail vaildation'

        #validating user
        if 'user' in obj:
            if 'id' in obj['user']:
                if type(obj['user']['id']) is str:
                    if output['status'] == 201:
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
            if 'type' in obj['sensor']: 
                if type(obj['sensor']['type']) is str: 
                    if output['status'] == 201:
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
            if 'timestamp' in obj['data'] and 'value' in obj['data']:
                if type(obj['data']['timestamp']) is float:
                    if obj['sensor']['type'] == 'Humidity':        
                        if obj['data']['value'] > 0:
                            if output['status'] == 201:
                                output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    elif obj['sensor']['type'] == 'Temperature':  
                        temp = int(obj['data']['value'])
                        if temp > 0:
                            if output['status'] == 201:
                                output['msg'] = 'Validated'
                        else:
                            output['status'] = 404
                            output['msg'] = 'Fail vaildation' 
                    elif obj['sensor']['type'] == 'Pressure': 
                        if obj['data']['value'] is True or obj['data']['value'] is False:
                            if output['status'] == 201:
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
        raise Exception('ERROR POST SensorData')





