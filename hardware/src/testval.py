import json

class ValidClass:
    
    obj = {}

    def read_data(self, val):
        try:
           # self.obj = json.loads(val.stream.read())
            self.obj = json.loads(val.read())
            print 'Value is validated'
            return True

        except ValueError, e:
            self.obj = {}
            print 'Fail vaildation'
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
                
                output['msg'] =  'Validated'
                
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'

            #validating time stemp
            if 'timestamp' in self.obj:
                #if obj()
                output['msg'] =  'Validated'
                print '2'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'

            #validating user
            if 'user' in self.obj:
                if 'id' in self.obj and 'name' in self.obj:
                    output['msg'] =  'Validated'
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'
            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'

            
            #validating sensor
            if 'sensor' in self.obj:
                if 'id' in self.obj and 'type' in self.obj:
                    output['msg'] =  'Validated'
                else:
                    output['status'] = 404
                    output['msg'] = 'Fail vaildation'

            else:
                output['status'] = 404
                output['msg'] = 'Fail vaildation'

            #validating data
            if 'data' in self.obj:
                if 'timestamp' in self.obj and 'value' in self.obj:
                    output['msg'] =  'Validated'
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

respons={}
f= open('C:\Users\HP_\Desktop\Fall 2020\TESThardware\data.json') 
a = ValidClass()
a.validate_data(f,respons)

print(respons)
