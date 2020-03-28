import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

//These will be used for the Health Monitoring System.
const Login = lazy(() => import('../../Pages/Login/Login'));
const SignUp = lazy(() => import('../../Pages/Login/SignUp'));

const LoginMain = () => {

    return (
        <Fragment>
            {/* Login */}
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
                <Route path="/login" component={Login}/>
            </Suspense>

            {/* Sign Up */}
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
                <Route path="/signup" component={SignUp}/>
            </Suspense>

            {/* Default Route */}
            <Route exact path="/" render={() => (
                <Redirect to="/login"/>
            )}/>
        </Fragment>
    );
}

export default LoginMain