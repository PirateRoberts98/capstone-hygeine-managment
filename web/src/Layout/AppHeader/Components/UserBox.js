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

import avatar1 from '../../../assets/utils/images/avatars/2.jpg';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            fname: 'Loading...',
            lname: '',
            doctor: 'Loading...'
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({
                fname: this.props.fname,
                lname: this.props.lname,
                doctor: this.props.doctor
            });
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
                                        <img width={42} className="rounded-circle" src={avatar1} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem>
                                                <NavLink href="hello">
                                                    Settings
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="hello">
                                                    Messages
                                                    <div className="ml-auto badge badge-warning">4</div>
                                                </NavLink>
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
                                <div className="widget-subheading">
                                    Patient of {this.state.doctor}
                                </div>
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