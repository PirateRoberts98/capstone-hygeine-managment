import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';
import AppFooter from '../../../Layout/AppFooter';

//Charts
import WaterUsageChart from './Charts/WaterUsageChart';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

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
                                    subheading="This dashboard shows you information of the water usage based on the collection of sensor data."
                                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                                />
                            </div>
                            <Row form>
                                <Col md={9}>
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle>Water Usage Chart</CardTitle>
                                            <WaterUsageChart/>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
);

export default MainDashboard;