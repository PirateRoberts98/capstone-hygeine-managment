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

// Other Components.
import Alerts from './Alert';

const ContactDoctor = ({match}) => (
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
);

export default ContactDoctor;