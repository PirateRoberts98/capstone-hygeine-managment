import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// Other Components
import Alerts from '../../../components/Alert';

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
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ContactDoctor() {
    const [openPollSnackBar, setPollSnackBarOpen] = React.useState(false);
    const [pollSnackBarLabel, setPollSnackBarLabel] = React.useState();

    const sensorPollRateControl = (buttonControlName) => {
        switch (buttonControlName) {
            case 'pollUp':
                setPollSnackBarLabel("Sensor Polled Up.");
                break;
            case 'pollDown':
                setPollSnackBarLabel("Sensor Polled Down.");
                break;
            case 'pollStop':
                setPollSnackBarLabel("Sensor Polling Stopped.");
                break;
        }

        setPollSnackBarOpen(true);
    }

    const handlePollSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPollSnackBarOpen(false);
    }

    return (
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
                                    Alerts
                                </Typography>
                                <Alerts />
                                <Typography variant="h2" gutterBottom>
                                    Sensor Control
                                </Typography>
                                <Button onClick={()=>sensorPollRateControl('pollUp')} style={{ marginBottom:"15px", marginRight:"15px" }} variant="contained" color="secondary">
                                    Poll Rate Up
                                </Button>
                                <Button onClick={()=>sensorPollRateControl('pollDown')} style={{ marginBottom:"15px", marginRight:"15px" }} variant="contained" color="secondary">
                                    Poll Rate Down
                                </Button>
                                <Button onClick={()=>sensorPollRateControl('pollStop')} style={{ marginBottom:"15px", marginRight:"15px" }} variant="contained" color="secondary">
                                    Stop Polling
                                </Button>
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
                                <Snackbar open={openPollSnackBar} autoHideDuration={6000} onClose={handlePollSnackBarClose}>
                                    <Alert onClose={handlePollSnackBarClose} severity="info">
                                        {pollSnackBarLabel}
                                    </Alert>
                                </Snackbar>
                            </ReactCSSTransitionGroup>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}