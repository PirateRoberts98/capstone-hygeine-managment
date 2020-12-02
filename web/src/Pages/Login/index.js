import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

const SignIn = lazy(() => import('../../Pages/Login/SignIn'));
const SignUp = lazy(() => import('../../Pages/Login/SignUp'));

class LoginMain extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
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
                    <Route path="/login" render={(props) => 
                        <SignIn 
                            {...props} 
                            handleLogin={this.props.handleLogin}
                            handleLoginDeveloper={this.props.handleLoginDeveloper}
                        />
                    }/>
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
                    <Route path="/signup" render={(props) => 
                        <SignUp {...props}
                            handleLogin={this.props.handleLogin} 
                        /> 
                    }/>
                </Suspense>
    
                {/* Default Route */}
                <Route exact path="/" render={() => (
                    <Redirect to="/login"/>
                )}/>
            </Fragment>
        );
    }
}

export default LoginMain