import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faCalendarAlt,
    faAngleDown

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../assets/utils/images/avatars/4.jpg';
import avatar5 from '../../../assets/utils/images/avatars/8.jpg';
import avatar6 from '../../../assets/utils/images/avatars/11.jpg';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            fname: 'Loading...',
            lname: '',
            doctor: 'Loading...',
            userImage: avatar1,
            userData: {
                "fname": "Loading...",
                "lname": "Loading...",
                "doctor": "Loading...",
                "isPatient": false,
                "isDeveloper": false,
                "isCaregiver": false
            }
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({
                fname: this.props.fname,
                lname: this.props.lname,
                doctor: this.props.doctor,
                userData: this.props.userData
            });
            switch (this.props.userData.fname) {
                case "Alanna":
                    this.setState({
                        userImage: avatar1
                    });
                break;
                case "Scott":
                    this.setState({
                        userImage: avatar2
                    });
                break;
                case "James":
                    this.setState({
                        userImage: avatar3
                    });
                break;
                case "Mike":
                    this.setState({
                        userImage: avatar4
                    });
                break;
                case "Nikita":
                    this.setState({
                        userImage: avatar5
                    });
                break;
                case "Robert":
                    this.setState({
                        userImage: avatar6
                    });
                break;
                default:
                    this.setState({
                        userImage: avatar1
                    });
                break;
            }
        }
    }

    handleLogout = () => {
        this.props.setUserData('');
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    render() {
        return (
            <Fragment>
                {!this.state.active &&
                    <Redirect to="/login" />
                }
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={this.state.userImage} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem>
                                                <NavLink href="/login#/settingsPage">
                                                    Settings
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                {this.state.userData.isCaregiver && 
                                                    <NavLink href="/login#/messageusers">
                                                        Message User
                                                    <div className="ml-auto badge badge-warning">5</div>
                                                    </NavLink>
                                                }
                                                {this.state.userData.isPatient && 
                                                    <NavLink href="/login#/contactdoctor">
                                                        Message Caregiver
                                                    <div className="ml-auto badge badge-warning">1</div>
                                                    </NavLink>
                                                }
                                                {this.state.userData.isDeveloper && 
                                                    <NavLink href="/login#/messageusers">
                                                        Message User
                                                    <div className="ml-auto badge badge-warning">2</div>
                                                    </NavLink>
                                                }
                                            </NavItem>
                                            <NavItem onClick={()=>this.handleLogout()}>
                                                <NavLink href="/login">
                                                    Logout
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {this.state.fname+' '+this.state.lname}
                                </div>
                                {this.state.userData.isPatient && 
                                    <div className="widget-subheading">
                                        Patient of {this.state.doctor}
                                    </div>
                                }
                            </div>

                            <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                        id="Tooltip-1">
                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt}/>
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Check Schedule
                                </UncontrolledTooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;