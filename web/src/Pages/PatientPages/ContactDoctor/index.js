import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

// Material UI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Other Components.
import MessagesComponent from '../../../components/MessagesComponent'
import Alerts from './Alert';

export default function ContactDoctor(){
    const [messageFormContent, setMessageFormContent] = React.useState('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');
    const [isSnackbarOpen, setSnackbarView] = React.useState(false);
    const onMessageFormChange = (event) => {
        setMessageFormContent(event.target.value);
    }
    const onSendRequestClick = () => {
        let messageJson = {
            "senderId": 0,
            "receiverId": 1,
            "message": messageFormContent
        }
        var request = new Request('http://localhost:3001'+'/api/postMessage', {
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
    return(<Fragment>
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
                                    heading="Contact Caregiver"
                                    subheading="Contact your caregiver or your doctor below."
                                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                                />
                            </div>
                            <Typography variant="h2" gutterBottom>
                                Contact Caregiver
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
                            <Alerts />
                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
    );
}



