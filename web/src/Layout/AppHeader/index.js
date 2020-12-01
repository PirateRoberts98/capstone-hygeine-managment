import React, {Fragment} from 'react';
import cx from 'classnames';

import {connect} from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import UserBox from './Components/UserBox';
import PatientDropDown from './Components/PatientDropDown';

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            userData: {
                "fname": "Loading...",
                "lname": "Loading...",
                "doctor": "Loading...",
                "isPatient": false,
                "isDeveloper": false,
                "isCaregiver": false
            }
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props) {
            if(this.props.userData) {
                this.setState({
                    userData: this.props.userData
                });
            }
        }
    }

    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, {'header-shadow': enableHeaderShadow})}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo/>

                    <div className={cx(
                        "app-header__content",
                        {'header-mobile-open': enableMobileMenuSmall},
                    )}>
                        <div className="app-header-left">
                            <SearchBox/>
                        </div>
                        {this.state.userData.isCaregiver &&
                            <div className="page-title-actions">
                                <PatientDropDown 
                                    isGatheringDataState={this.props.isGatheringDataState} 
                                    setSelectedPatient={this.props.setSelectedPatient}
                                />
                            </div>
                        }
                        {this.state.userData.isDeveloper &&
                            <PatientDropDown 
                                isGatheringDataState={this.props.isGatheringDataState} 
                                setSelectedPatient={this.props.setSelectedPatient}
                            />
                        }
                        <div className="app-header-right">
                            <UserBox fname={this.state.userData.fname} lname={this.state.userData.lname} doctor={this.state.userData.doctor} />
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);