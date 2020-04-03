

class AlertModule:
    def __init__(self,buffer_size,api):
        self.buffer = []
        self.buffer_size = buffer_size
        self.api = api 
        self.same_results = 0

    def check_data_value(self,data):
        #current checks on data are limited to type
        if isinstance(data, float) or isinstance(data, bool):
            self.add_to_buffer(data)
        else:
            return

        if self.buffer[-1] == data :
            self.same_results += 1
        else:
            self.same_results = 0
        #current alert being raised is only based on pressure
        if self.same_results == 3 :
            self.api.add_alert("Patient has not taken pills.")

        
    def add_to_buffer(self,data):
        if len(self.buffer) < self.buffer_size :
            self.buffer.append(data)
        else:
            # Remove the oldest value from array
            self.buffer.pop(0)
            self.buffer.append(data)