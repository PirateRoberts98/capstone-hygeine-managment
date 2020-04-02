import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav, ExampleMainNav,
ContactDoctorNav, PillsNav, ScheduleNav, CheckUserAnalysisNav, SetUserScheduleNav, MessageUsersNav} from './NavItems';

import * as firebase from "firebase/app";
import "firebase/database";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeveloper: true,
            isCaregiver: true,
        }
    }

    componentDidMount() {
        if(firebase.auth().currentUser) {
            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/'+userId).once('value')
            .then(snapshot => {
                this.setState({
                    isDeveloper: false,
                    isCaregiver: snapshot.val().isCaregiver,
                })
            });
        }
    }

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Health Monitoring System</h5>
                {/* Cargiver View */}
                {this.state.isCaregiver &&
                <div>
                    <MetisMenu content={CheckUserAnalysisNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={SetUserScheduleNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={MessageUsersNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                }
                {/* Patient View */}
                {!this.state.isCaregiver &&
                <div>
                    <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={PillsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={ScheduleNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={ContactDoctorNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                }
                {/* Developer View */}
                {this.state.isDeveloper &&
                <div>
                    <MetisMenu content={CheckUserAnalysisNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={SetUserScheduleNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={MessageUsersNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={PillsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={ScheduleNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <MetisMenu content={ContactDoctorNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Menu</h5>
                    <MetisMenu content={ExampleMainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example UI Components</h5>
                    <MetisMenu content={ComponentsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Widgets</h5>
                    <MetisMenu content={WidgetsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Forms</h5>
                    <MetisMenu content={FormsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Charts</h5>
                    <MetisMenu content={ChartsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                }
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);