def testvalid(data):
    try:
        print("data:")
        print(data)
        if 'user' in data:
            print("user exists")
        return data
    except:
        raise Exception('ERROR POST SensorData')