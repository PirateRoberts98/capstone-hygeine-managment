#### Running Local Web Application
Please follow Installation section before running the local web application.
Open Terminal and go to root directory of web.

Perform the following in command line.

    npm start

This will have the web application run locally on your machine on localhost:3000.

#### Mike Diep 8334439
Bootstrap reference:
    ArchitectUI Bootstrap 4 ReactJS Theme FREE
    Made with love by DashboardPack.com

### Installation
Download and uncompress the theme package archive in your desired folder location.

Download and install Node.js from nodejs.org/en/download/

Install the latest version of npm. This will be useful when running all the build commands. Run the following in a command line, either your IDE's Terminal window or in a Windows Command Prompt.

                                                            
    npm install --global npm@latest
                                                            
                                                        
Install the app dependencies by running the following command in the command line inside the folder root where you have unzipped the theme package archive.


    npm install
                                                        
After npm finishes installing the modules from package.json you can go ahead and start the application. To do so, run the command below.

You can also use yarn to install dependencies instead of npm.


    npm run start
                                                        
After the comand finished, you should see a Compiled successfully! message in your terminal window. Also, a web server service will be started so you can view your app in the browser: http://localhost:3000

### Production Build

To create a production optimised build run the command below:


    npm run build
                                                        
This created another folder in the root of your project named build. You'll have an option to start a local web server to view your newly created production build.


    serve -s build -l 4000
                                                        
This will start a local web server on port 4000, on which the production folder (/build/) will be available in your browser.

### References
Logo - https://www.e-apostolidis.gr/wp-content/uploads/2018/07/image_thumb_64DE19F2.png
