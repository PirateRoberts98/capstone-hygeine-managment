import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

// Material UI
import Typography from '@material-ui/core/Typography';

// Other Components
import Alerts from './Alert';

const PillsPage = ({match}) => (
    <Fragment>
        <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}>
            <Typography variant="h2" gutterBottom>
                Upcoming Pills
            </Typography>
            <Alerts />
            <Typography variant="h2" gutterBottom>
                Prescribed Pills - Pickup
            </Typography>
            <Alerts />
        </ReactCSSTransitionGroup>
    </Fragment>
);

export default PillsPage;