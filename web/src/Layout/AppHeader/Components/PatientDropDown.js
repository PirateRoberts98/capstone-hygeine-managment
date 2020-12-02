import React, {Component, Fragment} from 'react';
import {
    DropdownToggle, DropdownMenu, Nav, NavItem, NavLink, UncontrolledDropdown
} from 'reactstrap';
import {
    faBusinessTime

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    toast,
    Slide
} from 'react-toastify';

const awsConnection = require('../../../config/config.json');

const defaultPatientData = [
    {
        "patientId": 1,
        "fname": "James",
        "lname": "Lee",
        "gender": "male"
    },
    {
        "patientId": 2,
        "fname": "Scott",
        "lname": "Fulton",
        "gender": "male"
    },
    {
        "patientId": 3,
        "fname": "Mike",
        "lname": "Diep",
        "gender": "male"
    },
    {
        "patientId": 4,
        "fname": "Nikita",
        "lname": "Bliumkin",
        "gender": "male"
    },
    {
        "patientId": 5,
        "fname": "Alanna",
        "lname": "Doyle",
        "gender": "female"
    },
    {
        "patientId": 6,
        "fname": "Robert",
        "lname": "Conrad",
        "gender": "male"
    }
];

export default class PatientDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patientArray: [''],
            patientArrayJSX: [''],
            isDropDownOpen: false
        });

        this.retrievePatientsForCaregiver = this.retrievePatientsForCaregiver.bind(this);
    }

    componentDidMount() {
        this.retrievePatientsForCaregiver()
        let patientArray = defaultPatientData;
        let navItemsArray=[];
        for(let patient in patientArray){
            let navItem = <NavItem onClick={()=>this.handleClick(patient)}><NavLink><i className="nav-link-icon lnr-book"> </i><span>{patientArray[patient].fname} {patientArray[patient].lname}</span><div className="ml-auto badge badge-pill badge-danger">{Math.floor((Math.random() * 50) + 1)}</div></NavLink></NavItem>
            navItemsArray.push(navItem);
        }
        this.setState({
            patientArrayJSX: navItemsArray,
            patientArray: patientArray
        });
        this.props.setSelectedPatient(patientArray[0]); // Set the selectedPatient as the first item in the dropbox when app launches.
        
    }

    retrievePatientsForCaregiver() {
        var tht = this;
        var request = new Request(awsConnection.awsEC2Connection+'/api/getPatients/'+this.props.userData.userId, {
            method: 'GET',
        });
        fetch(request).then(function(response) {
            response.json()
                .then(function(data){
                    if(data){
                        let patientArray = [];
                        let patientArrayJSX = [];
                        // Map the patient data Object to appropriate arrays.
                        data.map(item => {
                            if(item != undefined) {
                                let patientName = item.patientfName + ' ' + item.patientlName;
                                let patientId = item.patientId;
                                let patient = {
                                    "patientId": patientId,
                                    "fname": item.patientfName,
                                    "lname": item.patientlName,
                                    "patientName": patientName
                                }
                                patientArray.push(patient);
                            }
                        });

                        // Format into JSX
                        for(let i=0; i < patientArray.length; i++) {
                            let patientJSX = ( 
                                <NavItem key={patientArray[i].patientId} onClick={()=>tht.handleClick(patientArray[i].patientId)}>
                                    <NavLink>
                                        <i className="nav-link-icon lnr-book"> </i>
                                        <span>{patientArray[i].patientName}</span>
                                        <div className="ml-auto badge badge-pill badge-danger">
                                            {Math.floor((Math.random() * 50) + 1)}
                                        </div>
                                    </NavLink>
                                </NavItem>);

                            patientArrayJSX.push(patientJSX);
                        }

                        let patientData = [patientArrayJSX,patientArray];
                        return patientData;
                    }
                })
                .then((patientData)=>{
                    if(patientData[1].length > 0) {
                        tht.setState({
                            patientArrayJSX: patientData[0],
                            patientArray: patientData[1]
                        });
                        tht.props.setSelectedPatient(patientData[1][0]); // By default the first person should be selected. 
                    }
                    tht.setState({
                        errorRetrievingData: false
                    });
                })
                .catch(function(err){
                    if(tht.state.errorRetryCount === 5) {
                        clearInterval(tht.interval);
                    }
                    tht.setState({
                        errorRetrievingData: true,
                        errorRetryCount: tht.state.errorRetryCount + 1
                    })
                    console.log(err);
                });
        });
    }

    toggle(name) {
        this.setState({
            [name]: !this.state[name],
            progress: 0.5,
            isDropDownOpen: true
        })
    }

    notify22 = () => this.toastId = toast("Another toastify example!!!", {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    handleClick(patientId) {
        for(let i=0; i < this.state.patientArray.length; i++) {
            if(this.state.patientArray[i].patientId == patientId) {
                let selectedPatient = this.state.patientArray[i];
                this.props.setSelectedPatient(selectedPatient); // Send Patient back to AppMain.
                this.setState({
                    isDropDownOpen: false
                });
            }
        }
    }

    handleToggleClick() {
        this.setState({
            isDropDownOpen: !this.state.isDropDownOpen
        });
    }
    render() {
        return (
            <Fragment>
                <UncontrolledDropdown isOpen={this.state.isDropDownOpen} className="d-inline-block">
                    <DropdownToggle onClick={()=>this.handleToggleClick()} color="info" className="btn-shadow" caret>
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
                                this.state.patientArrayJSX
                            }
                        </Nav>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Fragment>
        );
    }
}