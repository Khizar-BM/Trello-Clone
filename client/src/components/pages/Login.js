// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

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

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {auth: {isAuthenticated}, login} = useContext(AuthContext)

    const {email, password} = formData;

    useEffect(() => {
        document.title = 'TrelloClone | Sign In';
    }, []);

    useEffect(() => {
            if (isAuthenticated) navigate("/dashboard");
        }, [isAuthenticated]
    )

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);

    };

    return (
        <Container component='main' maxWidth='xs' className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component='h1' variant='h4'>
                    TrelloClone
                </Typography>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={onChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={onChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link href='/register' variant='body2'>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default Login;
