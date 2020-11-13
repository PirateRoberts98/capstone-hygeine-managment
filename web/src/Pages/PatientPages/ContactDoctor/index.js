import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
                                    heading="Contact Caregiver"
                                    subheading="Contact your caregiver or your doctor below."
                                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                                />
                            </div>
                            <Typography variant="h2" gutterBottom>
                                Contact Caregiver
                            </Typography>
                            <form>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                defaultValue=""
                                variant="outlined"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                //className={classes.button}
                                endIcon={<Icon>send</Icon>}
                            >
                                Send
                            </Button>
                            </form>
                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
);

export default ContactDoctor;