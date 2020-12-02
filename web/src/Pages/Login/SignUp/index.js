import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
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
      backgroundImage: "url(" + "https://pbs.twimg.com/media/EoLKVN-XEAAjFaD?format=png&name=medium" + ")",
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
            selectedCaregiver: "",
            selectedRole: "",
        });
    }

    handleSignUpBackend = (email,password1,password2,fname,lname, doctor) => {
        var that = this;
        let data= {
            fname: fname,
            lname: lname,
            bday: this.state.selectedDate,
            gender: this.state.selectedGender,
            doctor: this.selectedCaregiver,
            isCaregiver: (this.state.selectedRole === "Caregiver"),
            isPatient: (this.state.selectedRole === "Patient"),
            isDeveloper: (this.state.selectedRole === "Developer"),
            email: email,
            password1: password1
        }
        var request = new Request(awsConnection.awsEC2Connection+'/api/register', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request).then(function(response) {
            response.json().then(function(data){
                if(data.value){
                    that.props.handleLogin();
                }
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

    handleCaregiverChange = event => {
        this.setState({
            selectedCaregiver: event.target.value,
        })
    };

    handleRoleChange = event => {
        this.setState({
            selectedRole: event.target.value,
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
                        <InputLabel id="demo-simple-select-outlined-label" required>Gender</InputLabel>
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
                    <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: "15px" }}>
                        <InputLabel id="demo-simple-select-outlined-label" required>Role</InputLabel>
                        <Select
                            labelId="role"
                            id="role"
                            value={this.state.selectedRole}
                            onChange={this.handleRoleChange}
                            label="Role"
                        >
                        <MenuItem value="Caregiver">Caregiver</MenuItem>
                        <MenuItem value="Patient">Patient</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                        </Select>
                    </FormControl>
                    {this.state.selectedRole === "Developer" &&
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="Developer Passcode"
                            label="Developer Passcode"
                            name="Developer Passcode"
                            required
                            autoFocus
                        />
                    } 
                    {this.state.selectedRole === "Patient" && 
                        <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: "15px" }}>
                        <InputLabel id="demo-simple-select-outlined-label" required>Caregiver</InputLabel>
                            <Select
                                labelId="caregiver"
                                id="caregiver"
                                value={this.state.selectedCaregiver}
                                onChange={this.handleCaregiverChange}
                                label="caregiver"
                            >
                                <MenuItem value="Alanna Doyle">Alanna Doyle</MenuItem>
                                <MenuItem value="Nikita Bliumkin">Nikita Bliumkin</MenuItem>
                            </Select>
                        </FormControl>
                    }
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
                            document.getElementById('lname').value
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