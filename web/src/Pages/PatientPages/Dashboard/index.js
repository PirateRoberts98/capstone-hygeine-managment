import React, {Fragment, useState, useEffect} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
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
    );
}