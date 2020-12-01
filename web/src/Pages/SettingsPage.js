import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

export default function SettingsPage(props) {
  const [userData,setUserData] = React.useState('')

  useEffect(()=>{
    setUserData(props.userData);
  });

  return(
    <Fragment>
      <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <Typography variant="h4" gutterBottom>
              First Name
          </Typography>
            <Typography variant="h5" gutterBottom style={{ marginLeft: "50px" }}>
                {userData.fname}
            </Typography>
          <Typography variant="h4" gutterBottom>
            Last Name
          </Typography>
            <Typography variant="h5" gutterBottom style={{ marginLeft: "50px" }}>
                {userData.lname}
            </Typography>
          <Typography variant="h4" gutterBottom>
            Birthday
          </Typography>
            <Typography variant="h5" gutterBottom style={{ marginLeft: "50px" }}>
                {userData.bday}
            </Typography>
          <Typography variant="h4" gutterBottom>
            Gender
          </Typography>
            <Typography variant="h5" gutterBottom style={{ marginLeft: "50px" }}>
                {userData.gender}
            </Typography>
          {userData.isPatient &&
            <div>
              <Typography variant="h4" gutterBottom>
                Doctor
              </Typography>
                <Typography variant="h5" gutterBottom style={{ marginLeft: "50px" }}>
                    {userData.doctor}
                </Typography>
            </div>
          }
          {userData.isDeveloper &&
            <div>
              <Typography variant="h4" gutterBottom>
                Doctor
              </Typography>
                <Typography variant="h5" gutterBottom style={{ marginLeft: "50px" }}>
                    {userData.doctor}
                </Typography>
            </div>
          }
      </ReactCSSTransitionGroup>
    </Fragment>
  );
} 
