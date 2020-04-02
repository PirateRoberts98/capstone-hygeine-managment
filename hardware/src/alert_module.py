

class AlertModule:
    def __init__(self,buffer_size,api):
        self.buffer = []
        self.buffer_size = buffer_size
        self.api = api 

    def check_data_value(self,data):
        return NotImplemented # TODO for scott
        # Should use add_to_buffer if valid reading to ensure local copy 
        # if alert needed, use  api.add_alert(0,"This is a message for severity 0")

        
    def add_to_buffer(self,data):
        if len(self.buffer) < self.buffer_size :
            self.buffer.append(data)
        else:
            # Remove the oldest value from array
            self.buffer.remove(0)
            self.buffer.append(data)