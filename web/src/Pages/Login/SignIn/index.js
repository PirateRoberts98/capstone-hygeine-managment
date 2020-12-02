import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import HMSLogo from '../../../assets/utils/images/HealthMonitoringSystemLogoCopy.jpg';

const awsConnection = require('../../../config/config.json');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Health Monitoring System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignIn = (email,password) => {
        var that = this;
        let data= {
            email: email,
            password: password
        }
        var request = new Request(awsConnection.awsEC2Connection+'/api/login', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request).then(function(response) {
            response.json().then(function(data){
                if(data.userId){
                    that.props.handleLogin(data.userId);
                }
            })
        }).catch(function(err){
            console.log(err)
        });
    }

    handleDeveloperButton() {
        this.props.handleLoginDeveloper();
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7}>
            <img className={classes.image} src={HMSLogo} alt=""/>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>this.handleSignIn()}
                        onClick={()=>this.handleSignIn(
                            document.getElementById('email').value,
                            document.getElementById('password').value,
                        )}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>this.handleDeveloperButton()}
                    >
                        / Developer
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/Sign" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true })(SignIn);