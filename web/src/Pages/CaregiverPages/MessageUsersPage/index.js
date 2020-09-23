import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

const ContactDoctor = ({match}) => (
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
                                    heading="Contact Doctor"
                                    subheading="Contact a general physcian or your doctor below."
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

export default ContactDoctor;