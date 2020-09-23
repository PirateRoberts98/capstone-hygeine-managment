import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
// Firebase imports
import * as firebase from "firebase/app";
import "firebase/auth";
// Get a reference to the database service
var database = firebase.database();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
      backgroundImage: '',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#7FC4FD',
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
    formControl : {
        width:'50%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(1),
        margin: theme.spacing(1),
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  });

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            selectedGender: "",
            selectedDate: new Date(),
            caregiverCheckbox: false,
        });
    }

    handleSignUp = (email,password1,password2,fname,lname, doctor) => {
        firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then(()=>{
            firebase.database().ref('users/'+ firebase.auth().currentUser.uid).set({
                email: email,
                fname:fname,
                lname:lname,
                bday:this.state.selectedDate,
                gender:this.state.selectedGender,
                doctor: doctor,
                isCaregiver: this.state.caregiverCheckbox,
            })
            .then(()=>{
                this.props.handleLogin();
            })
            .catch((error)=>{
                var errorCode = error.errorCode;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
        })
        .catch((error) => {
            var errorCode = error.errorCode;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        })
    }

    handleSignUpBackend = (email,password1,password2,fname,lname, doctor) => {
        let data= {
            email: email,
            password1: password1,
            fname: fname,
            lname: lname,
            doctor: doctor,
        }
        var request = new Request('http://localhost:3001/api/register', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request).then(function(response) {
            response.json().then(function(data){
                console.log(data);
            })
        }).catch(function(err){
            console.log(err)
        });
    }

    handleGenderChange = event => {
        this.setState({
            selectedGender: event.target.value,
        })
      };

    handleDateChange = event => {
        this.setState({
            selectedDate: event.target.value,
        })
    }

    handleCaregiverCheckbox = event => {
        this.setState({
            caregiverCheckbox: event.target.checked,
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First Name"
                        name="fname"
                        autoComplete="fname"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lname"
                        label="Last Name"
                        name="lname"
                        autoComplete="lname"
                        autoFocus
                    />
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
                        id="doctor"
                        label="Your General Physician"
                        name="doctor"
                        autoComplete="doctor"
                        autoFocus
                    />
                    <form className={classes.container} noValidate>
                        <TextField
                            id="bday"
                            label="Birthday"
                            type="date"
                            defaultValue="1990-01-01"
                            className={classes.textField}
                            onChange={this.handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                        <Select
                            labelId="gender"
                            id="gender"
                            value={this.state.selectedGender}
                            onChange={this.handleGenderChange}
                            label="Gender"
                        >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.caregiverCheckbox}
                                onChange={this.handleCaregiverCheckbox}
                                name="Cargiver"
                                color="primary"
                            />
                        }
                        label={"Caregiver"}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>this.handleSignUpBackend(
                            document.getElementById('email').value,
                            document.getElementById('password1').value,
                            document.getElementById('password2').value,
                            document.getElementById('fname').value,
                            document.getElementById('lname').value,
                            document.getElementById('doctor').value
                        )}
                    >
                        Sign Up
                    </Button>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
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

export default withStyles(styles, {withTheme: true })(SignUp);