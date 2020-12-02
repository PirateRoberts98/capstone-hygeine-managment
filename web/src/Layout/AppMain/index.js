import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment, useState, useEffect} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import PageTitle from './PageTitle';

// These will be used for the Health Monitoring System.
// Caregiver Views/Pages
const UsersAnalysisPage = lazy(() => import('../../Pages/CaregiverPages/UsersAnalysisPage')); // Route to be changed.
const UsersSchedulePage = lazy(() => import('../../Pages/CaregiverPages/UsersSchedulePage')); // Route to be changed.
const MessageUsersPage = lazy(() => import('../../Pages/CaregiverPages/MessageUsersPage')); // Route to be changed.
// Patient Views/Pages
const MainDashboard = lazy(() => import('../../Pages/PatientPages/Dashboard'));
const ContactDoctorPage = lazy(() => import('../../Pages/PatientPages/ContactDoctor'));
const PillsPage = lazy(() => import('../../Pages/PatientPages/Pills'));
const SchedulePage = lazy(() => import('../../Pages/PatientPages/Schedule'));
// Developer Views/Pages
const SensorPage = lazy(() => import('../../Pages/DeveloperPages/Sensor'));
// Settings Page
const SettingsPage = lazy(() => import('../../Pages/SettingsPage'));

// These are all examples.
const Dashboards = lazy(() => import('../../ExamplePages/Dashboards'));
const Widgets = lazy(() => import('../../ExamplePages/Widgets'));
const Elements = lazy(() => import('../../ExamplePages/Elements'));
const Components = lazy(() => import('../../ExamplePages/Components'));
const Charts = lazy(() => import('../../ExamplePages/Charts'));
const Forms = lazy(() => import('../../ExamplePages/Forms'));
const Tables = lazy(() => import('../../ExamplePages/Tables'));

const awsConnection = require('../../config/config.json');

// An Example of a user
const exampleUserObject = {
    "userId": 0,
    "fname": "James",
    "lname": "Lee",
    "bday": "12/12/1997",
    "gender": "female",
    "doctor": "James Chui",
    "isPatient": false,
    "isCaregiver": false,
    "isDeveloper": true,
    "email": "developer@hms.com"
}

export default function AppMain(props) {
    const [userData, setUserData] = React.useState(null);
    const [isGatheringDataState, setIsGatheringDataState] = React.useState(true);
    const [selectedPatient, setSelectedPatient] = React.useState('');

    useEffect(()=>{
        // Fetch user information with userId.
        let userIdJSON = {"userId": props.userId}
        var request = new Request(awsConnection.awsEC2Connection+'/api/getUserData', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json', 'Accept' : 'application/json' }),
            body: JSON.stringify(userIdJSON)
        });
        fetch(request).then((response) => {
            response.json().then((data) => {
                if(data.userId){
                    console.log(data);
                    setUserData(data);
                    setIsGatheringDataState(false);
                }
            });
        }).catch(function(err){
            setUserData(exampleUserObject);
            setIsGatheringDataState(false);
            console.log(err);
        });
    }, []);

    return (
        <Fragment>
            <AppHeader 
                userData={userData} 
                isGatheringDataState={isGatheringDataState} 
                setSelectedPatient={setSelectedPatient}
                setUserData={setUserData}
            />
            {isGatheringDataState && 
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load...
                            <small>Please Wait...</small>
                        </h6>
                    </div>
                </div>
            }
            {
                !isGatheringDataState &&
                    <div className="app-main">
                    <AppSidebar userData={userData} />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Fragment>
                                {/* Health Monitoring System Routes */}

                                {/* Caregiver View Routes */}
                                {/* Users Analysis */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/usersanalysis" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading={"Charts And Alerts for Patient - " + selectedPatient.fname + ' ' + selectedPatient.lname}
                                                subheading="Latest update on - xx/xx/xxxx."
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <UsersAnalysisPage 
                                                    userData={userData}
                                                    patientData={selectedPatient}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Users Schedule */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/usersschedule" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading={"Patient Schedule - " + selectedPatient.fname + ' ' + selectedPatient.lname}
                                                subheading="Last updated on xx/xx/xxxx"
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <UsersSchedulePage 
                                                    userData={userData}
                                                    patientData={selectedPatient}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Message Users */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/messageusers" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading={"Message Patient - " + selectedPatient.fname + ' ' + selectedPatient.lname}
                                                subheading="Contact the patient below."
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <MessageUsersPage 
                                                    userData={userData}
                                                    patientData={selectedPatient}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Patient View Routes */}
                                {/* Dashboard */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/maindashboard" render={(props) =>
                                        <div>
                                            <PageTitle
                                                heading="Dashboard"
                                                subheading="Alerts and Recommended Actions"
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <MainDashboard 
                                                    userData={userData}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Contact Doctor */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/contactdoctor" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading="Contact Caregiver"
                                                subheading="Contact your caregiver or your doctor below."
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <ContactDoctorPage 
                                                    userData={userData}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Pills */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/pills" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading="Pills"
                                                subheading="Required Pills - Time and Date."
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <PillsPage 
                                                    userData={userData}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Schedule */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/schedule" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading="Schedule"
                                                subheading="This dashboard displays your schedule and routine."
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <SchedulePage 
                                                    userData={userData}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Sensor Page */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/sensors" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading="Sensors and Alerts"
                                                subheading="This dashboard shows all the sensors, temperature and pressure, in additon to alerts."
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <SensorPage 
                                                    userData={userData}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Settings Page */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load...
                                                <small>Please Wait...</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/settingsPage" render={(props)=>
                                        <div>
                                            <PageTitle
                                                heading="Settings Page"
                                                subheading="User Information"
                                                icon="pe-7s-user icon-gradient bg-mean-fruit"
                                            />
                                            <div style={{ paddingTop: "102px" }}>
                                                <SettingsPage 
                                                    userData={userData}
                                                />
                                            </div>
                                        </div>
                                    }/>
                                </Suspense>

                                {/* Default Route */}
                                <Route exact path="/" render={() => (
                                    <Redirect to="/maindashboard"/>
                                )}/>





                                {/**
                                 * Everything below here are Examples of Routes
                                 * 
                                 * 
                                 * 
                                 * 
                                 */}
                                {/* Components */}
                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load all the Components examples
                                                <small>Because this is a demonstration we load at once all the Components examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/components" component={Components}/>
                                </Suspense>

                                {/* Forms */}

                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load all the Forms examples
                                                <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/forms" component={Forms}/>
                                </Suspense>

                                {/* Charts */}

                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-3">
                                                Please wait while we load all the Charts examples
                                                <small>Because this is a demonstration we load at once all the Charts examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/charts" component={Charts}/>
                                </Suspense>

                                {/* Tables */}

                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-5">
                                                Please wait while we load all the Tables examples
                                                <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/tables" component={Tables}/>
                                </Suspense>

                                {/* Elements */}

                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-3">
                                                Please wait while we load all the Elements examples
                                                <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/elements" component={Elements}/>
                                </Suspense>

                                {/* Dashboard Widgets */}

                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-3">
                                                Please wait while we load all the Dashboard Widgets examples
                                                <small>Because this is a demonstration we load at once all the Dashboard Widgets examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/widgets" component={Widgets}/>
                                </Suspense>

                                {/* Dashboards */}

                                <Suspense fallback={
                                    <div className="loader-container">
                                        <div className="loader-container-inner">
                                            <h6 className="mt-3">
                                                Please wait while we load all the Dashboards examples
                                                <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                                            </h6>
                                        </div>
                                    </div>
                                }>
                                    <Route path="/dashboards" component={Dashboards}/>
                                </Suspense>
                                <ToastContainer/>
                            </Fragment>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
};