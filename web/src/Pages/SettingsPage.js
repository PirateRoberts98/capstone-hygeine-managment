import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Typography from '@material-ui/core/Typography';

export default function SettingsPage() {

    return(
      <Fragment>
        <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}>
            <Typography variant="h2" gutterBottom>
                User Information
            </Typography>
        </ReactCSSTransitionGroup>
    </Fragment>
    )
} 
