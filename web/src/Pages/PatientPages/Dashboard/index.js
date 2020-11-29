import React, {Fragment, useState, useEffect} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';
import AppFooter from '../../../Layout/AppFooter';

//Charts
import WaterUsageChart from './Charts/WaterUsageChart';

// Other Components
import Alerts from './Alert';

// Material UI
import Typography from '@material-ui/core/Typography';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

export default function MainDashboard(props) {
    const [userData, setUserData] = React.useState(props.userData);

    useEffect(()=>{
        setUserData(props.userData);
    })

    return (
        <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar userData={userData} />
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
                                    subheading="Alerts and Recommended Actions"
                                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                                />
                            </div>
                            <Typography variant="h2" gutterBottom>
                                Alerts
                            </Typography>
                            <Alerts />
                            <Typography variant="h2" gutterBottom>
                                Messages
                            </Typography>
                            <Alerts />
                            <Typography variant="h2" gutterBottom>
                                Charts
                            </Typography>
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
}