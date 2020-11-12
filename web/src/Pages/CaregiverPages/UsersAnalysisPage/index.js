import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// Other Components
import Alerts from './Alert';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

// Charts
import SensorHumidityChart from './Charts/SensorHumidity';
import SensorPressureChart from './Charts/SensorPressure';
import SensorTemperatureChart from './Charts/SensorTemperature';

// MaterialUI
import Typography from '@material-ui/core/Typography';

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
                                    heading="Charts And Alerts for patient - xxxxxxxxx"
                                    subheading="Latest update on - xx/xx/xxxx."
                                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                                />
                            </div>
                            <Typography variant="h2" gutterBottom>
                                Humidity Chart
                            </Typography>
                            <SensorHumidityChart/>
                            <Typography variant="h2" gutterBottom>
                                Sensor Chart
                            </Typography>
                            <SensorPressureChart/>
                            <Typography variant="h2" gutterBottom>
                                Temperature Chart
                            </Typography>
                            <SensorTemperatureChart/>
                            <Typography variant="h2" gutterBottom>
                                Alerts
                            </Typography>
                            <Alerts />
                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
);

export default ContactDoctor;