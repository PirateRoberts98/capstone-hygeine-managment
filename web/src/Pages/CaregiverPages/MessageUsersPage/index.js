import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

// Other Components
import MessagesComponent from '../../../components/MessagesComponent'

const awsConnection = require('../../../config/config.json');

export default function MessageUser() {
    const [messageFormContent, setMessageFormContent] = React.useState('');

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
                console.log(data);
            });
          }).catch(function(err){
            console.log(err);
        });
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
                                        heading="Message Patient - xxxxxxxxxx"
                                        subheading="Contact the patient below."
                                        icon="pe-7s-user icon-gradient bg-mean-fruit"
                                    />
                                </div>
                                <Typography variant="h2" gutterBottom>
                                    Contact Patient - xxxx
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
                            </ReactCSSTransitionGroup>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}