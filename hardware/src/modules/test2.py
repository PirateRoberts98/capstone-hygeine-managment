# Include standard modules
import argparse
text = '''
This application is the middleware application for the CEG4912 Group 2 Capstone Project

For more information, email rconr060@uottawa.ca 
'''

# Initiate the parser
parser = argparse.ArgumentParser(description=text)

# Add long and short argument
parser.add_argument("--base_url", "-u", help="set the value of the base_url to a different value (default https://localhost:8080)")
parser.add_argument("--local_buffer", "-b", help="set the local bugger that modules use for data analysis without GET requests")
parser.add_argument("-M", "--mock", help="Run the application using mock sensor data ", action="store_true")
parser.add_argument("-O", "--offline", help="Run the system offline (API Calls print to sysout)", action="store_true")

# Read arguments from the command line
args = parser.parse_args()

base_url= "https://localhost:8080"
local_buffer = 200
# Check for --width
if args.mock:
    print("Using Mock Sensors")
if args.offline:
    print("Running System Offline")
if args.base_url:
    base_url = args.base_url
if args.local_buffer:
    local_buffer = args.local_buffer  
print(local_buffer + 1)
print("Sending requests to URL %s" % base_url)