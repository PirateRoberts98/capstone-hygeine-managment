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
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        //className={classes.button}
                                        endIcon={<SendIcon/>}
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

export default ContactDoctor;