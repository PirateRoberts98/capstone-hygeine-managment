import React, {Fragment, useState, useEffect} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Other Components
import MessagesComponent from '../../../components/MessagesComponent'

const awsConnection = require('../../../config/config.json');

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MessageUserPage(props) {
    const [messageFormContent, setMessageFormContent] = React.useState('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');
    const [isSnackbarOpen, setSnackbarView] = React.useState(false);
    const [patientData, setPatientData] = React.useState('');

    useEffect(()=>{
        setPatientData(props.patientData);
    });

    const onMessageFormChange = (event) => {
        setMessageFormContent(event.target.value);
    }

    const onSendRequestClick = () => {
        let messageJson = {
            "senderId": 0,
            "receiverId": 1,
            "message": messageFormContent
        }
        var request = new Request(awsConnection.awsEC2Connection+'/api/postMessage', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json', 'Accept': 'application/json' }),
            body: JSON.stringify(messageJson)
          });
          fetch(request).then((response) => {
            response.json().then((data) => {
                setMessageFormContent('');
                setSnackbarMessage('Your message was sent!');
                setSnackbarSeverity('success')
                setSnackbarView(true);
            });
          }).catch(function(err){
            setSnackbarMessage('There was an error with your message - ' + err);
            setSnackbarSeverity('error');
            setSnackbarView(true);
        });
    }

    const handlePollSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarView(false);
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
                    Contact Patient
                </Typography>
                <form>
                    <div style={{ marginBottom:'15px' }}>
                        <TextField
                            style={{ width:'50%' }}
                            id="outlined-multiline-static"
                            label="Message"
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="outlined"
                            onChange={(event)=>onMessageFormChange(event)}
                            value={messageFormContent}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            //className={classes.button}
                            endIcon={<SendIcon/>}
                            onClick={()=>onSendRequestClick()}
                        >
                            Send
                        </Button>
                    </div>
                </form>
                <Typography variant="h2" gutterBottom>
                    Messages
                </Typography>
                <MessagesComponent />
                <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handlePollSnackBarClose}>
                    <Alert onClose={handlePollSnackBarClose} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
}