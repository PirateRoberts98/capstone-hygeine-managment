import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter, Redirect} from 'react-router-dom';
import ResizeDetector from 'react-resize-detector';

// Layouts
import AppMain from '../../Layout/AppMain';

// Pages
import LoginMain from '../Login';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            closedSmallerSidebar: false,
            isLoggedIn: false,
            userIdNum: ""
        });
        this.handleLogin=this.handleLogin.bind(this);
        this.handleLoginDeveloper=this.handleLoginDeveloper.bind(this);
    } 

    handleLogin(userId){
        this.setState({
            isLoggedIn: true,
            userIdNum: userId
        });
    }

    // Handle login of a developer.
    handleLoginDeveloper(){
        this.setState({
            isLoggedIn: true,
            userIdNum: "1"
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
                                <div>
                                    <Redirect to="/login" />
                                    <LoginMain 
                                        handleLogin={this.handleLogin} 
                                        handleLoginDeveloper={()=>this.handleLoginDeveloper()}
                                    />
                                </div>
                            }
                            {this.state.isLoggedIn &&
                                <div>
                                    <Redirect to="/maindashboard" />
                                    <AppMain userId={this.state.userIdNum} />
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