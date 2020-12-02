import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import Nav from '../AppNav/VerticalNavWrapper';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

import {
    setEnableMobileMenu
} from '../../reducers/ThemeOptions';

class AppSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            userData: this.props.userData,
            activeLinkId: 1,
            isNavMenuItemClicked: false
        })

        this.onMenuClick = this.onMenuClick.bind(this);
    }

    componentDidMount(){
       this.setState({
            userData: this.props.userData
       });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props) {
            this.setState({
                userData: this.props.userData
           });
        }
    }

    toggleMobileSidebar = () => {
        let {enableMobileMenu, setEnableMobileMenu} = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }

    onMenuClick(linkId) {
        this.setState({
            activeLinkId: linkId,
            isNavMenuItemClicked: !this.state.isNavMenuItemClicked
        });
    }

    render() {
        let {
            backgroundColor,
            enableBackgroundImage,
            enableSidebarShadow,
            backgroundImage,
            backgroundImageOpacity,
        } = this.props;

        return (
            <Fragment>
                <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar}/>
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-sidebar", backgroundColor, {'sidebar-shadow': enableSidebarShadow})}
                    transitionName="SidebarAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <HeaderLogo/>
                    <PerfectScrollbar>
                        <div className="app-sidebar__inner">
                            {this.state.isNavMenuItemClicked && 
                                <Nav userData={this.state.userData} onMenuClick={(linkId)=>this.onMenuClick(linkId)} activeLinkId={this.state.activeLinkId}/>
                            }
                            {!this.state.isNavMenuItemClicked && 
                                <Nav userData={this.state.userData} onMenuClick={(linkId)=>this.onMenuClick(linkId)} activeLinkId={this.state.activeLinkId}/>
                            }
                        </div>
                    </PerfectScrollbar>
                    <div
                        className={cx("app-sidebar-bg", backgroundImageOpacity)}
                        style={{
                            backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                        }}>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
    enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    backgroundColor: state.ThemeOptions.backgroundColor,
    backgroundImage: state.ThemeOptions.backgroundImage,
    backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);