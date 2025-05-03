// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from '../other/Copyright';
import useStyles from '../../utils/formStyles';
import {AuthContext} from "../../contexts/authStore";

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const {auth: {isAuthenticated}, register, setAlert} = useContext(AuthContext)

    useEffect(() => {
        document.title = 'TrelloClone | Sign Up';
    }, []);

    useEffect(() => {
            if (isAuthenticated) navigate("/dashboard");
        }, [isAuthenticated]
    )

    const {name, email, password, password2} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'error');
        } else {
            register({name, email, password});
        }

    };

    return (
        <Container component='main' maxWidth='xs' className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component='h1' variant='h4'>
                    TrelloClone
                </Typography>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='name'
                                name='name'
                                variant='outlined'
                                required
                                fullWidth
                                label='Your Name'
                                autoFocus
                                value={name}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                value={email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password2'
                                label='Confirm Password'
                                type='password'
                                value={password2}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link href='/login' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default Register;
