import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Layout
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

// Charts
import SensorTemperatureChart from './Charts/SensorTemperature';
import SensorPressureChart from './Charts/SensorPressure';
import SensorHumidityChart from './Charts/SensorHumidity';

//Alert
import Alert from './Alert';

//ReactStrap
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

const SensorPage = ({match}) => (
    <Fragment>
        <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}>
            <Row form>
                <Col md={6}>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Sensor Temperature</CardTitle>
                            <SensorTemperatureChart/>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Sensor Pressure</CardTitle>
                            <SensorPressureChart/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row form>
                <Col md={6}>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Sensor Humidity</CardTitle>
                            <SensorHumidityChart/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row form>
                <Card className="main-card mb-3">
                    <CardBody>
                        <CardTitle>Alerts</CardTitle>
                        <Alert />
                    </CardBody>
                </Card>
            </Row>
        </ReactCSSTransitionGroup>
    </Fragment>
);

export default SensorPage;