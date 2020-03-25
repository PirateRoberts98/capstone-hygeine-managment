import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from '../../Layout/AppMain/PageTitle';

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const MainDashboard = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Fragment>
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="TabsAnimation"
                            transitionAppear={true}
                            transitionAppearTimeout={0}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <div>
                                <PageTitle
                                    heading="Dashboard"
                                    subheading="This is an example dashboard created using build-in elements and components."
                                    icon="pe-7s-car icon-gradient bg-mean-fruit"
                                />
                            </div>
                        </ReactCSSTransitionGroup>
                    </Fragment>
                    <AppFooter/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default MainDashboard;