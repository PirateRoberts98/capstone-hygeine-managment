import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter, Redirect} from 'react-router-dom';

import ResizeDetector from 'react-resize-detector';

// Layouts
import AppMain from '../../Layout/AppMain';

// Pages
import LoginMain from '../Login';

// Firebase Imports
import * as firebase from "firebase/app";
require("firebase/auth");

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            closedSmallerSidebar: false,
            isLoggedIn: false,
            firebaseConfig :{
                apiKey: "AIzaSyB3pKW3ySHeWEI9bqrwwOLBXALrH1RBu4M",
                authDomain: "ceg4912project.firebaseapp.com",
                databaseURL: "https://ceg4912project.firebaseio.com",
                projectId: "ceg4912project",
                storageBucket: "ceg4912project.appspot.com",
                messagingSenderId: "1065298873625",
                appId: "1:1065298873625:web:72647a9fc8c16b94764988",
                measurementId: "G-3FQY5ZVMNC"
              },
        });
        // Initialize Firebase
        if(!firebase.apps.length) {
            firebase.initializeApp(this.state.firebaseConfig);
        }
    }

    handleLogin(){
        this.setState({
            isLoggedIn: true
        });
    }

    render() {
        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;

        return (
            <ResizeDetector
                handleWidth
                render={({ width }) => (
                    <Fragment>
                        <div className={cx(
                            "app-container app-theme-" + colorScheme,
                            {'fixed-header': enableFixedHeader},
                            {'fixed-sidebar': enableFixedSidebar || width < 1250},
                            {'fixed-footer': enableFixedFooter},
                            {'closed-sidebar': enableClosedSidebar || width < 1250},
                            {'closed-sidebar-mobile': closedSmallerSidebar || width < 1250},
                            {'sidebar-mobile-open': enableMobileMenu},
                        )}>
                            {!this.state.isLoggedIn &&
                                <LoginMain handleLogin={()=>this.handleLogin()} />
                            }
                            {this.state.isLoggedIn &&
                                <div>
                                    <Redirect to="/maindashboard" />
                                    <AppMain />
                                </div>
                            }
                        </div>
                    </Fragment>
                )}
            />
        )
    }
}

const mapStateToProp = state => ({
    colorScheme: state.ThemeOptions.colorScheme,
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedFooter: state.ThemeOptions.enableFixedFooter,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,

});

export default withRouter(connect(mapStateToProp)(Main));