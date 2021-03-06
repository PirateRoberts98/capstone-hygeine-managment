import React, {Fragment, useEffect} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// Other Components
import Alerts from '../../../components/Alert';

// Charts
import SensorHumidityChart from '../../../components/charts/SensorHumidity';
import SensorPressureChart from '../../../components/charts/SensorPressure';
import SensorTemperatureChart from '../../../components/charts/SensorTemperature';

// MaterialUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UsersAnalysisPage(props) {
    const [openPollSnackBar, setPollSnackBarOpen] = React.useState(false);
    const [pollSnackBarLabel, setPollSnackBarLabel] = React.useState();
    const [userData, setUserData] = React.useState(props.userData);
    const [patientData, setPatientData] = React.useState('');

    useEffect(()=>{
        setPatientData(props.patientData);
    });

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
                    Pressure Chart
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
    );
}