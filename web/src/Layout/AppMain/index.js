import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

//These will be used for the Health Monitoring System.
const MainDashboard = lazy(() => import('../../Pages/Dashboard'));
const ContactDoctorPage = lazy(() => import('../../Pages/ContactDoctor'));
const PillsPage = lazy(() => import('../../Pages/Pills'));
const SchedulePage = lazy(() => import('../../Pages/Schedule'));


//These are all examples.
const Dashboards = lazy(() => import('../../ExamplePages/Dashboards'));
const Widgets = lazy(() => import('../../ExamplePages/Widgets'));
const Elements = lazy(() => import('../../ExamplePages/Elements'));
const Components = lazy(() => import('../../ExamplePages/Components'));
const Charts = lazy(() => import('../../ExamplePages/Charts'));
const Forms = lazy(() => import('../../ExamplePages/Forms'));
const Tables = lazy(() => import('../../ExamplePages/Tables'));

const AppMain = () => {

    return (
        <Fragment>
            {/* Health Monitoring System Routes */}

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
                <Route path="/maindashboard" component={MainDashboard}/>
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
                <Route path="/contactdoctor" component={ContactDoctorPage}/>
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
                <Route path="/pills" component={PillsPage}/>
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
                <Route path="/schedule" component={SchedulePage}/>
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
    )
};

export default AppMain;