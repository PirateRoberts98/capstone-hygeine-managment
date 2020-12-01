import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Layout
import PageTitle from '../../../Layout/AppMain/PageTitle';

export default function UsersSchedulePage() {
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
                    heading="Patient Schedule for xxxxxxxxxx"
                    subheading="Last updated on xx/xx/xxxx"
                    icon="pe-7s-user icon-gradient bg-mean-fruit"
                />
            </div>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23039BE5&amp;ctz=America%2FToronto&amp;src=ZGV2ZWxvcGVyLmhlYWx0aGNhcmVtb25pdG9yQGdtYWlsLmNvbQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=1&amp;showNav=1&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=1&amp;title=Patient%20Calendar" style={{borderWidth: 0}} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
        </ReactCSSTransitionGroup>
    </Fragment>
}