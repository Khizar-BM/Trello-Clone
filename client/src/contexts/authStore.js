import React, {createContext, useReducer} from 'react';
import authReducer, {authInitialState} from "../reducers/auth";
import alertReducer, {alertInitialState} from "../reducers/alert";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS, REMOVE_ALERT, SET_ALERT,
    USER_LOADED
} from "../actions/types";
import {v4 as uuidv4} from "uuid";

export const AuthContext = createContext({})

const AuthStore = (props) => {
    const [auth, dispatch] = useReducer(authReducer, authInitialState);
    const [alerts, alertDispatch] = useReducer(alertReducer, alertInitialState);

    const setAlert = (msg, alertType, timeout = 5000) => {
        const id = uuidv4();
        alertDispatch({
            type: SET_ALERT,
            payload: {msg, alertType, id},
        });
        setTimeout(() => alertDispatch({type: REMOVE_ALERT, payload: id}), timeout);
    };

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };
    const register = async ({name, email, password}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({name, email, password});


        try {
            const res = await axios.post('/api/users', body, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            await loadUser();
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => setAlert(error.msg, 'error'));
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };
    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({email, password});

        try {
            const res = await axios.post('/api/auth', body, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            await loadUser();
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => setAlert(error.msg, 'error'));
            }

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };
    const logout = () => dispatch({type: LOGOUT})

    return (<AuthContext.Provider value={{auth, alerts, setAlert, loadUser, register, login, logout}}>
        {props.children}
    </AuthContext.Provider>)

}

export default AuthStore;