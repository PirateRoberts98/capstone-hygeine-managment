import React, {Component, Fragment} from 'react';

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, Nav, NavItem, NavLink,
} from 'reactstrap';

import {
    faBusinessTime

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    toast,
    Slide
} from 'react-toastify';

export default class PatientDropDown extends Component {
    constructor(props) {
        super(props);
        this.setState({
            patientArray: [],
            navItemsArray: ['']
        });

    }

    componentDidMount() {
        let patientArray = ['Nikita', 'James','Mike','Robert','Alanna','Scott'];
        let navItemsArray=[];
        for(let patient in patientArray){
            let navItem = <NavItem onClick={()=>this.handleClick(patient)}><NavLink><i className="nav-link-icon lnr-book"> </i><span>{patientArray[patient]}</span><div className="ml-auto badge badge-pill badge-danger">{Math.floor((Math.random() * 50) + 1)}</div></NavLink></NavItem>
            navItemsArray.push(navItem);
        }
        this.setState({
            navItemsArray: navItemsArray,
            patientArray: patientArray
        });
        this.props.setSelectedPatient(patientArray[0]); // Set the selectedPatient as the first item in the dropbox when app launches.
    }

    toggle(name) {
        this.setState({
            [name]: !this.state[name],
            progress: 0.5,
        })
    }

    notify22 = () => this.toastId = toast("Another toastify example!!!", {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    handleClick(navItemId) {
        let selectedPatient = this.state.patientArray[navItemId];
        this.props.setSelectedPatient(selectedPatient); // Send Patient back to AppMain.
    }

    render() {
        return (
            <Fragment>
                <UncontrolledDropdown className="d-inline-block">
                    <DropdownToggle color="info" className="btn-shadow" caret>
                        <span className="btn-icon-wrapper pr-2 opacity-7">
                            <FontAwesomeIcon icon={faBusinessTime}/>
                        </span>
                        Patients
                    </DropdownToggle>
                    <DropdownMenu right>
                        <Nav vertical>
                            {this.props.isGatheringDataState &&
                                <span>loading...</span>
                            }
                            {!this.props.isGatheringDataState &&
                                this.state.navItemsArray
                            }
                        </Nav>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Fragment>
        );
    }
}