import json


class ValidClass:
    
    obj = {}

    def read_data(self, val):
        try:
           # self.obj = json.loads(val.stream.read())
            self.obj = json.loads(val.read())
            print ('Data recieved')
            return True

        except ValueError:
            self.obj = {}
            print('Fail reading data')
            return False

    def validate_data(self, req, resp):

        validation = self.read_data(req)
        
        output = {
            'status' : 201,
            'msg' : None
        }

        if(validation == True):
            #validating device id
            if 'device_id' in self.obj:
                if type(self.obj['device_id']) is str:
                    output['msg'] =  'Validated'
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'      
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'

            #validating time stemp
            if 'timestamp' in self.obj:
                if type(self.obj['timestamp']) is str:
                    output['msg'] =  'Validated'
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'   
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'

            #validating user
            if 'user' in self.obj:
                if 'id' in self.obj['user'] and 'name' in self.obj['user']:
                    if type(self.obj['user']['name']) is str:
                        temp = int(self.obj['user']['id'])
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
            if 'sensor' in self.obj:
                if 'id' in self.obj['sensor'] and 'type' in self.obj['sensor']: 
                    if type(self.obj['sensor']['type']) is str: 
                        temp = int(self.obj['sensor']['id'])
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
            if 'data' in self.obj:
                if 'timestamp' in self.obj['data'] and 'value' in self.obj['data']:
                    if type(self.obj['data']['timestamp']) is str:
                        if self.obj['sensor']['type'] == 'Humidity':
                            temp = int(self.obj['data']['value'])
                            if temp > 0:
                                output['msg'] = 'Validated'
                            else:
                                output['status'] = 404
                                output['msg'] = 'Fail vaildation' 
                        elif self.obj['sensor']['type'] == 'Temperature':  
                            if temp > 0:
                                output['msg'] = 'Validated'
                            else:
                                output['status'] = 404
                                output['msg'] = 'Fail vaildation' 
                        elif self.obj['sensor']['type'] == 'Pressure':  
                            if self.obj['data']['value'] is 'true' or self.obj['data']['value'] is 'false':
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
            
        else:
            output['status'] = 404
            output['msg'] = 'Fail vaildation'

        resp = json.dumps(output)



