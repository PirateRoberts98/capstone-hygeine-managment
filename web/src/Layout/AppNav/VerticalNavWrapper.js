import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav, ExampleMainNav,
ContactDoctorNav, PillsNav, ScheduleNav, CheckUserAnalysisNav, SetUserScheduleNav, MessageUsersNav, SensorNav} from './NavItems';

//import * as firebase from "firebase/app";
//import "firebase/database";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            isDeveloper: false,
            isCaregiver: false,
            isPatient: false,
        }

        this.onMenuClick = this.onMenuClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            userData: this.props.userData
        });
        /*if(firebase.auth().currentUser) {
            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/'+userId).once('value')
            .then(snapshot => {
                let isCaregiver = snapshot.val().isCaregiver;
                if(isCaregiver) {
                    this.setState({
                        isDeveloper: false,
                        isPatient: false,
                        isCaregiver: true,
                    })
                } else {
                    this.setState({
                        isDeveloper: false,
                        isPatient: true,
                        isCaregiver: false,
                    })
                }
            });
        } else {
            this.setState({
                isDeveloper: true,
                isPatient: false,
                isCaregiver: false,
            })
        }*/
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props) {
            this.setState({
                userData: this.props.userData,
           });
            if(this.props.userData) {
                this.setState({
                    isCaregiver: this.props.userData.isCaregiver,
                    isDeveloper: this.props.userData.isDeveloper,
                    isPatient: this.props.userData.isPatient
               });
            }
        }
    }

    onMenuClick(linkId) {
        this.setState({
            activeLinkId: linkId
        });
        console.log("ChaningLinkIed");
        console.log(this.props.activeLinkId);
    }

    render() {
        return (
            <Fragment>
                {/* Cargiver View */}
                {this.state.isCaregiver &&
                <div>
                    <div onClick={()=>this.props.onMenuClick(1)}><MetisMenu content={CheckUserAnalysisNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(3)}><MetisMenu content={SetUserScheduleNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(4)}><MetisMenu content={MessageUsersNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                </div>
                }
                {/* Patient View */}
                {this.state.isPatient &&
                <div>
                    <div onClick={()=>this.props.onMenuClick(1)}><MetisMenu content={MainNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(5)}><MetisMenu content={PillsNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(6)}><MetisMenu content={ScheduleNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(7)}><MetisMenu content={ContactDoctorNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                </div>
                }
                {/* Developer View */}
                {this.state.isDeveloper &&
                <div>
                    <h5 className="app-sidebar__heading">Caregiver View</h5>
                    <div onClick={()=>this.props.onMenuClick(1)}><MetisMenu content={CheckUserAnalysisNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(3)}><MetisMenu content={SetUserScheduleNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(4)}><MetisMenu content={MessageUsersNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <h5 className="app-sidebar__heading">Patient View</h5>
                    <div onClick={()=>this.props.onMenuClick(1)}><MetisMenu content={MainNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(5)}><MetisMenu content={PillsNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(6)}><MetisMenu content={ScheduleNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <div onClick={()=>this.props.onMenuClick(7)}><MetisMenu content={ContactDoctorNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    <h5 className="app-sidebar__heading">Developer View</h5>
                    <div onClick={()=>this.props.onMenuClick(8)}><MetisMenu content={SensorNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/></div>
                    {/*<h5 className="app-sidebar__heading">Example Menu</h5>
                    <MetisMenu content={ExampleMainNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example UI Components</h5>
                    <MetisMenu content={ComponentsNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Widgets</h5>
                    <MetisMenu content={WidgetsNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Forms</h5>
                    <MetisMenu content={FormsNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    <h5 className="app-sidebar__heading">Example Charts</h5>
                    <MetisMenu content={ChartsNav} activeLinkId={this.props.activeLinkId} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>*/}
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