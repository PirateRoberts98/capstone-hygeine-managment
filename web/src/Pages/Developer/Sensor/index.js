import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Layout
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

const SensorPage = ({match}) => (
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
                                    heading="Sensors"
                                    subheading="This dashboard shows all the sensors, temperature and pressure, in additon to alerts."
                                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                                />
                            </div>
                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
);

export default SensorPage;